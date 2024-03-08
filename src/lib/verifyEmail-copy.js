import * as dns from "dns";
import * as net from "net";
import { promisify } from "util";

const lookup = promisify(dns.lookup);
const resolveMx = promisify(dns.resolveMx);

// UPDATE to return verified Email
// In the future will give an email based on size of company which tells us most common email format patterns

async function verifyEmail(website, personName) {
    //const email = `${personName.split(' ').join('.').replace(/\s/g, "")}@${website}`; //first.last@website.com

    const emailFirstName = `${personName.split(" ")[0]}@${website}`; // first@website.com
    console.log(emailFirstName);

    // Domain check
    try {
        await lookup(website);
    } catch (error) {
        throw new Error("Domain does not exist");
    }

    // SMTP check
    const mxRecords = await resolveMx(website);
    const socket = net.createConnection(25, mxRecords[0].exchange);

    return new Promise((resolve, reject) => {
        socket.setEncoding("ascii");

        socket.setTimeout(5000, () => {
            socket.end();
            reject(new Error("Connection timeout"));
        });

        socket.on("data", (data) => {
            if (data.startsWith("220")) {
                // Send HELO command
                socket.write(`HELO ${website}\r\n`);
                console.log("HELO", website);
            } else if (data.startsWith("250")) {
                // Send MAIL FROM command
                socket.write(`MAIL FROM:<>\r\n`);
                console.log("MAIL FROM"); // spamming atm
            } else if (data.startsWith("250 ")) {
                // Send RCPT TO command
                socket.write(`RCPT TO:<${emailFirstName}>\r\n`);
                console.log("RCPT TO", emailFirstName);
            } else if (data.startsWith("250") || data.startsWith("251")) {
                // Email exists
                socket.end();
                resolve(emailFirstName); // returns verified email
            } else {
                // Email does not exist
                socket.end();
                reject(new Error("Email does not exist"));
            }
        });

        socket.on("error", (error) => {
            socket.end();
            reject(error);
        });
    });
}

export default verifyEmail;

verifyEmail("theepochtimes.com", "piron")
    .then((email) => console.log("Email exists:", email))
    .catch((error) => console.error("Error:", error.message));

// Example response from hunter.io
// https://api.hunter.io/v2/email-verifier?email=piron@theepochtimes.com&api_key=*******

// {
//     "data": {
//       "status": "accept_all",
//       "result": "risky",
//       "_deprecation_notice": "Using result is deprecated, use status instead",
//       "score": 73,
//       "email": "piron@theepochtimes.com",
//       "regexp": true,
//       "gibberish": false,
//       "disposable": false,
//       "webmail": false,
//       "mx_records": true,
//       "smtp_server": true,
//       "smtp_check": true,
//       "accept_all": true,
//       "block": false,
//       "sources": []
//     },
//     "meta": {
//       "params": {
//         "email": "piron@theepochtimes.com"
//       }
//     }
//   }
