import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { ErrorCard } from "@/components/ui/errorCard";
import { AlertCircle, HelpCircle } from "lucide-react";
import Lead from "@/components/Lead";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function Home() {
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

    const [verificationResponse, setEmailResponse] = useState<Response | null>(
        null
    );

    const getResponseMessage = (response: Response) => {
        if (response.error) {
            return (
                <ErrorCard>
                    <div className="p-3 items-center flex flex-row dark:bg-red-900 dark:text-red-50">
                        <AlertCircle strokeWidth="1" color="red" size={17} />
                        <p className="px-3 py-1">{response.message.body}</p>
                    </div>
                </ErrorCard>
            );
        } else if (response.success) {
            return (
                <Lead
                    message={response.message.body}
                    email={response.message.email}
                    name={response.message.fullName}
                    acceptsAll={response.message.acceptsAll}
                />
            );
        }
    };
    return (
        <div className="h-screen flex justify-center md:pt-4 bg-[#F7F9FA] dark:bg-zinc-900 ">
            <div className="md:max-w-xl w-full m-4">
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
                <SearchBar setEmailResponse={setEmailResponse} />
                {verificationResponse &&
                    getResponseMessage(verificationResponse)}
            </div>
        </div>
    );
}

export default Home;
