import React, { useState } from "react";

import dns from "dns";
import net from "net";
import { promisify } from "util";

const lookup = promisify(dns.lookup);
const resolveMx = promisify(dns.resolveMx);

async function verifyEmail(website: string, personName: string) {
    // Combine website and personName to form an email address
    const email = `${personName}@${website}`;

    // Syntax check
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    // Domain check
    const domain = website.split("@")[1];
    try {
        await lookup(domain);
    } catch (error) {
        throw new Error("Domain does not exist");
    }

    // SMTP check
    const mxRecords = await resolveMx(domain);
    const socket = net.createConnection(25, mxRecords[0].exchange);

    return new Promise<void>((resolve, reject) => {
        socket.setEncoding("ascii");

        socket.setTimeout(5000, () => {
            socket.end();
            reject(new Error("Connection timeout"));
        });

        socket.on("data", (data: string) => {
            if (data.startsWith("220")) {
                // Send HELO command
                socket.write(`HELO ${domain}\r\n`);
            } else if (data.startsWith("250")) {
                // Send MAIL FROM command
                socket.write(`MAIL FROM:<>\r\n`);
            } else if (data.startsWith("250 ")) {
                // Send RCPT TO command
                socket.write(`RCPT TO:<${website}>\r\n`);
            } else if (data.startsWith("250") || data.startsWith("251")) {
                // Email exists
                socket.end();
                resolve();
            } else {
                // Email does not exist
                socket.end();
                reject(new Error("Email does not exist"));
            }
        });

        socket.on("error", (error: Error) => {
            socket.end();
            reject(error);
        });
    });
}

type RequestButtonProps = {
    website: string;
    personName: string;
};

const RequestButton: React.FC<RequestButtonProps> = ({
    website,
    personName,
}) => {
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleClick = async () => {
        try {
            const data = await verifyEmail(website, personName);
            setResponse(data !== undefined ? data : "");
            setError(null);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Send Request</button>
            {response && <div>{JSON.stringify(response)}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default RequestButton;
