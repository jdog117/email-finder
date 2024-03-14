import * as dns from "dns";
import * as net from "net";
import { promisify } from "util";

const lookup = promisify(dns.lookup);
const resolveMx = promisify(dns.resolveMx);
export async function verifyEmail(website, personName) {
    //const email = `${personName.split(' ').join('.').replace(/\s/g, "")}@${website}`; //first.last@website.com
    let verifyResponse = {};
    const emailFirstName = `${personName.split(" ")[0]}@${website}`; // first@website.com

    // Domain check
    try {
        await lookup(website);
    } catch (error) {
        verifyResponse = {
            error: true,
            success: false,
            message: {
                email: "",
                acceptsAll: false,
                body: "Domain does not exist, check spelling or try another website",
                fullName: "",
            },
        };
        return verifyResponse;
    }

    // SMTP check
    const mxRecords = await resolveMx(website);
    const socket = net.createConnection(25, mxRecords[0].exchange);

    return new Promise((resolve) => {
        const timeout = 1000 * 10; // 10 seconds
        socket.setEncoding("ascii");
        socket.setTimeout(timeout, () => {
            socket.end();
            verifyResponse = {
                error: true,
                success: false,
                message: {
                    email: "",
                    acceptsAll: false,
                    body: "Can't verify email address. Connection to server timed out.",
                    fullName: "",
                },
            };
            resolve(verifyResponse);
        });

        let step = 0;
        let randomEmail = `random-${Math.random()}@${website}`;

        socket.on("data", (data) => {
            if (data.startsWith("220") && step === 0) {
                socket.write(`HELO ${website}\r\n`);
                step++;
            } else if (data.startsWith("250") && step === 1) {
                socket.write(`MAIL FROM:<>\r\n`);
                step++;
            } else if (data.startsWith("250") && step === 2) {
                socket.write(`RCPT TO:<${randomEmail}>\r\n`);
                step++;
            } else if (
                (data.startsWith("250") || data.startsWith("251")) &&
                step === 3
            ) {
                socket.end();
                verifyResponse = {
                    error: false,
                    success: true,
                    message: {
                        email: emailFirstName,
                        acceptsAll: true,
                        body: "",
                        fullName: personName,
                    },
                };
                resolve(verifyResponse); // accepts all
            } else if (step === 3) {
                // Server does not accept all emails, proceed with normal verification
                socket.write(`RCPT TO:<${emailFirstName}>\r\n`);
                step++;
            } else if (
                (data.startsWith("250") || data.startsWith("251")) &&
                step === 4
            ) {
                socket.end();
                verifyResponse = {
                    error: false,
                    success: true,
                    message: {
                        email: emailFirstName,
                        acceptsAll: false,
                        body: "",
                        fullName: personName,
                    },
                };
                resolve(verifyResponse); // email exists
            } else {
                socket.end();
                verifyResponse = {
                    error: false,
                    success: true,
                    message: {
                        email: "",
                        acceptsAll: false,
                        body: "Can't verify an email for this person",
                        fullName: personName,
                    },
                };
                resolve(verifyResponse);
            }
        });

        socket.on("error", (error) => {
            socket.end();
            verifyResponse = {
                error: true,
                success: false,
                message: {
                    email: "",
                    acceptsAll: false,
                    body: error.message,
                    fullName: "",
                },
            };
            resolve(verifyResponse);
        });
    });
}

/* Function doesnt work right now because linkedin wont return a body, probably detects this as programatic access */
// export async function getCompanySize(companyName, apiKey, searchEngineId) {
//     const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${companyName}`;

//     // Fetch the search results
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//         throw new Error("Failed to fetch search results");
//     }
//     const data = await response.json();

//     // Extract the LinkedIn URL from the search results
//     // Note: You'll need to adjust this part based on the structure of the search results
//     const linkedInUrl = data.items[0].link;
//     console.log(linkedInUrl);

//     // my search engine is set to only show *.linkedin.com/company/* results
//     // Fetch the LinkedIn profile
//     console.log(linkedInUrl);
//     const profileResponse = await fetch(linkedInUrl);
//     if (!profileResponse.ok) {
//         throw new Error("Failed to fetch LinkedIn profile");
//     }
//     const html = await profileResponse.text();
//     console.log(" pro resp: ", profileResponse);

//     // Extract the company size from the HTML
//     const regex =
//         /<span class="org-top-card-summary-info-list__info-item-text">([\d,]+)\s+employees<\/span>/;
//     const match = html.match(regex);
//     if (!match) {
//         throw new Error("Failed to extract company size");
//     }
//     const companySize = match[1].replace(",", "");

//     return parseInt(companySize);
// }
