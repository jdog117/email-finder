import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HelpCircle } from "lucide-react";

function emailFormat(
    employeeName: string,
    website: string,
    selectedSize: string
) {
    const emailFirst = `${employeeName.split(" ")[0]}@${website}`; // {first}@website.com
    const emailFLast = `${employeeName.split(" ")[0].charAt(0)}${employeeName.split(" ")[1]}@${website}`; // {f}{last}@website.com
    const emailFirstDotLast = `${employeeName.split(" ").join(".").replace(/\s/g, "")}@${website}`; // {first}.{last}@website.com
    if (selectedSize === "1") {
        return emailFirst;
    } else if (selectedSize === "2") {
        return emailFLast;
    } else if (selectedSize === "3") {
        return emailFirstDotLast;
    }
}

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
}

function SearchBar({ setEmailResponse }: SearchBarProps) {
    const [employeeName, setEmployeeName] = useState("");
    const [website, setWebsite] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

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

        if (website === "" || employeeName === "") {
            return;
        }

        const size = selectedSize === "" ? "1" : selectedSize; // selects first company size if none is selected
        const newEmail = emailFormat(employeeName, website, size);
        console.log(newEmail);
        console.log(
            `https://ninamori.us/verifyEmail?website=${website}&personName=${employeeName}&email=${newEmail}`
        );

        const response = await fetch(
            `https://ninamori.us/verifyEmail?website=${website}&personName=${employeeName}&email=${newEmail}`
        );
        const data = await response.json();
        setEmailResponse(data);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full py-3">
            <div className="flex flex-row justify-between items-center mb-3">
                <Select
                    onValueChange={setSelectedSize}
                    defaultValue={selectedSize}
                >
                    <SelectTrigger className="flex-none w-auto h-8 focus:outline-none">
                        <SelectValue placeholder="Company Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1-50</SelectItem>
                        <SelectItem value="2">51-1000</SelectItem>
                        <SelectItem value="3">1001+</SelectItem>
                    </SelectContent>
                </Select>

                <Popover>
                    <PopoverTrigger>
                        <HelpCircle strokeWidth="1" size={17} />
                    </PopoverTrigger>
                    <PopoverContent>
                        Enter an <em>employee name</em> and their company{" "}
                        <em>website</em> to generate and verify an email address
                        for this person
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex w-full">
                <input
                    value={employeeName}
                    onChange={handleEmployeeNameChange}
                    className="flex w-1/2 min-w-32 h-10 border border-input bg-background rounded-l-sm px-3 py-8 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed"
                    placeholder="employee name"
                    type="text"
                ></input>
                <div className="flex h-10 font-thin text-lg items-center justify-center border border-input bg-background px-4 py-8 disabled:cursor-not-allowed">
                    @
                </div>
                <input
                    value={website}
                    onChange={handleWebsiteChange}
                    className="flex w-1/2 min-w-32 h-10 border border-input bg-background rounded-r-sm px-3 py-8 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed"
                    placeholder="company.com"
                    type="text"
                ></input>
                <Button
                    type="submit"
                    className="py-8 px-3 ml-3 flex items-center justify-center md:px-6"
                >
                    <span className="md:hidden">
                        <Search className="p-0 m-0" size={20} />
                    </span>
                    <span className="hidden md:inline">Find</span>
                </Button>
            </div>
        </form>
    );
}

export default SearchBar;
