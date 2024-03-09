import * as dns from "dns";
import * as net from "net";
import { promisify } from "util";

const lookup = promisify(dns.lookup);
const resolveMx = promisify(dns.resolveMx);

async function verifyEmail(website, personName) {
    //const email = `${personName.split(' ').join('.').replace(/\s/g, "")}@${website}`; //first.last@website.com

    const emailFirstName = `${personName.split(" ")[0]}@${website}`; // first@website.com
    console.log(emailFirstName);

    // Domain check
    try {
        await lookup(website);
    } catch (error) {
        throw new Error(
            "Domain does not exist, check your spelling or try another website."
        );
    }

    // SMTP check
    const mxRecords = await resolveMx(website);
    const socket = net.createConnection(25, mxRecords[0].exchange);

    return new Promise((resolve, reject) => {
        const timeout = 1000 * 10; // 10 seconds
        socket.setEncoding("ascii");
        socket.setTimeout(timeout, () => {
            socket.end();
            reject(new Error("Connection timeout"));
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
                resolve("accepts all");
            } else if (step === 3) {
                // Server does not accept all emails, proceed with normal verification
                socket.write(`RCPT TO:<${emailFirstName}>\r\n`);
                step++;
            } else if (
                (data.startsWith("250") || data.startsWith("251")) &&
                step === 4
            ) {
                socket.end();
                resolve(emailFirstName); // email exists
            } else {
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

// for testing
// verifyEmail("", "")
//     .then((email) => console.log("Email exists:", email))
//     .catch((error) => console.error("Error:", error.message));

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