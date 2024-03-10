import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
//import verifyEmail from "@/lib/verifyEmail";

interface SearchBarProps {
    setEmailResponse: (data: string) => void;
}

function SearchBar({ setEmailResponse }: SearchBarProps) {
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
        event.preventDefault();
        const response = await fetch(
            `http://localhost:3001/verifyEmail?website=${website}&personName=${employeeName}`
        );
        const data = await response.text();
        setEmailResponse(data);
    };

    // TRYING TO MAKE THIS FLEX CORRECTLY WHEN X IS SMASHED
    return (
        <Card className="p-6">
            <CardHeader className="p-2">
                <h2 className="text-xl font-bold">SEARCH</h2>
            </CardHeader>
            <form
                onSubmit={handleSubmit}
                className="flex w-full items-center space-x-2 py-3"
            >
                <input
                    value={employeeName}
                    onChange={handleEmployeeNameChange}
                    className="flex-auto h-10 border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="employee name"
                    type="text"
                ></input>
                <div className="flex h-10 font-thin text-lg items-center justify-center border border-input bg-background px-3 py-6 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                    @
                </div>
                <input
                    value={website}
                    onChange={handleWebsiteChange}
                    className="flex-auto h-10 border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="company.com"
                    type="text"
                ></input>
                <Button type="submit" className="py-6 px-6">
                    Find
                </Button>
            </form>
        </Card>
    );
}

export default SearchBar;
