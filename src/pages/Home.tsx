import SearchBar from "@/components/SearchBar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ErrorCard } from "@/components/ui/errorCard";

function Home() {
    const [emailResponse, setEmailResponse] = useState("");

    const getResponseMessage = (response: string) => {
        switch (response) {
            case "accepts all":
                return (
                    <Card className="">
                        <div className="p-5">
                            <p>
                                This server accepts all emails so the email
                                can't be verified. Based on the size of the
                                company, the email is likely:
                            </p>
                        </div>
                    </Card>
                );
            case "not exist":
                return (
                    <Card className="">
                        <div className="p-5">
                            <p>Can't find email for this employee</p>
                        </div>
                    </Card>
                );
            case "no domain":
                return (
                    <ErrorCard>
                        <div className="p-3">
                            <p>
                                Domain does not exist, check spelling or try
                                another website
                            </p>
                        </div>
                    </ErrorCard>
                );
            default:
                return (
                    <Card className="">
                        <div className="p-5">
                            <p>Email verified!</p>
                            {emailResponse}
                        </div>
                    </Card>
                );
        }
    };
    return (
        <>
            <div className="flex bg-[#F7F9FA] dark:bg-zinc-900 h-screen flex-col items-center w-full pt-8">
                <div className="max-w-xl">
                    {/* <h1 className="font-bold py-3 text-lg">EMAIL FINDER</h1> */}
                    <SearchBar setEmailResponse={setEmailResponse} />
                    {getResponseMessage(emailResponse)}
                </div>
            </div>
        </>
    );
}

export default Home;
