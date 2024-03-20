const dns = require("dns");
const net = require("net");
const { promisify } = require("util");

async function verifyEmail(website, personName, newEmail) {
    const lookup = promisify(dns.lookup);
    const resolveMx = promisify(dns.resolveMx);
    let verifyResponse = {};

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
                        email: newEmail,
                        acceptsAll: true,
                        body: "",
                        fullName: personName,
                    },
                };
                resolve(verifyResponse); // accepts all
            } else if (step === 3) {
                // Server does not accept all emails, proceed with normal verification
                socket.write(`RCPT TO:<${newEmail}>\r\n`);
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
                        email: newEmail,
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

module.exports.verifyEmail = verifyEmail;
