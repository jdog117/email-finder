import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { ErrorCard } from "@/components/ui/errorCard";
import { AlertCircle } from "lucide-react";
import Lead from "@/components/Lead";

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
    //dark:bg-zinc-900
    return (
        <div className="h-screen min-w-32 flex-shrink-0 flex justify-center md:pt-4 bg-[#F7F9FA] dark:bg-background mx-2">
            <div className="md:max-w-xl w-full m-4 md:p-0 p-3">
                <SearchBar setEmailResponse={setEmailResponse} />
                {verificationResponse &&
                    getResponseMessage(verificationResponse)}
            </div>
        </div>
    );
}

export default Home;
