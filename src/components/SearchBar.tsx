import React, { useState } from "react";
import { Button } from "@/components/ui/button";
//import verifyEmail from "@/lib/verifyEmail";

interface Response {
    error: boolean;
    success: boolean;
    message: {
        email: string;
        acceptsAll: boolean;
        body: string;
        fullName: string;
    };
}

interface SearchBarProps {
    setEmailResponse: (data: Response) => void;
    setWebsiteResponse: (data: string) => void;
}

function SearchBar({ setEmailResponse, setWebsiteResponse }: SearchBarProps) {
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

    const handleSubmit = async (event: React.FormEvent) => {
        if (website === "" || employeeName === "") {
            return;
        } else {
            event.preventDefault();
            const response = await fetch(
                `/verifyEmail?website=${website}&personName=${employeeName}`
            );
            const data = await response.json();
            setEmailResponse(data);
            setWebsiteResponse(website.split(".")[0]);
        }
    };

    // TRYING TO MAKE THIS FLEX CORRECTLY WHEN X IS SMASHED
    return (
        <form onSubmit={handleSubmit} className="flex w-full py-3">
            <input
                value={employeeName}
                onChange={handleEmployeeNameChange}
                className="flex-initial w-60 h-10 border border-input bg-background rounded-l-sm px-3 py-8 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed"
                placeholder="employee name"
                type="text"
            ></input>
            <div className="flex h-10 font-thin text-lg items-center justify-center border border-input bg-background px-4 py-8 disabled:cursor-not-allowed">
                @
            </div>
            <input
                value={website}
                onChange={handleWebsiteChange}
                className="flex-initial w-60 h-10 border border-input bg-background rounded-r-sm px-3 py-8 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed"
                placeholder="company.com"
                type="text"
            ></input>
            <Button type="submit" className="py-8 px-6 ml-3 ">
                Find
            </Button>
        </form>
    );
}

export default SearchBar;
