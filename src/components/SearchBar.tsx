import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import verifyEmail from "@/verifyEmail";

function SearchBar() {
    const [website, setWebsite] = useState("");
    const [employeeName, setEmployeeName] = useState("");

    const handleWebsiteChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setWebsite(event.target.value);
        // validate input HERE
    };

    const handleEmployeeNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmployeeName(event.target.value);
        // validate input HERE
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Here you can handle the submission of the form
        verifyEmail(website, employeeName);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm items-center space-x-2"
        >
            <input
                value={employeeName}
                onChange={handleEmployeeNameChange}
                className="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter a full name"
                type="text"
            ></input>
            <div className="flex-none h-10 border border-input bg-background px-3 py-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                @
            </div>
            <input
                value={website}
                onChange={handleWebsiteChange}
                className="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="company.com"
                type="text"
            ></input>
            <Button type="submit">Find</Button>
        </form>
    );
}

export default SearchBar;
