import SearchBar from "@/components/SearchBar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ErrorCard } from "@/components/ui/errorCard";
import { AlertCircle, HelpCircle } from "lucide-react";
import Help from "@/components/Help";

function Home() {
    const [emailResponse, setEmailResponse] = useState("");
    const [websiteResponse, setWebsiteResponse] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const getResponseMessage = (response: string) => {
        switch (response) {
            case "accepts all":
                return (
                    <Card>
                        <div className="p-5">
                            <p>
                                Email cannot be verified because{" "}
                                {websiteResponse} servers accept all emails
                            </p>
                            <div className="border mt-5 "></div>
                            <p className="text-slate-500 text-sm mt-3">
                                Currently implementing feature to suggest an
                                email based on company size
                            </p>
                        </div>
                    </Card>
                );
            case "not exist":
                return (
                    <Card>
                        <div className="p-5">
                            <p>Can't find email for this employee</p>
                        </div>
                    </Card>
                );
            case "no domain":
                return (
                    <ErrorCard>
                        <div className="p-3 items-center flex flex-row dark:bg-red-900 dark:text-red-50">
                            <AlertCircle
                                strokeWidth="1"
                                color="red"
                                size={17}
                            />
                            <p className="px-3 py-1">
                                Domain does not exist, check spelling or try
                                another website
                            </p>
                        </div>
                    </ErrorCard>
                );
            default:
                return (
                    <Card>
                        <div className="p-5">
                            <p>Email verified!</p>
                            {emailResponse}
                        </div>
                    </Card>
                );
        }
    };
    return (
        <div className="flex bg-[#F7F9FA] dark:bg-zinc-900 h-screen flex-col items-center w-full pt-8">
            <div className="w-3/6">
                <div className="relative">
                    <HelpCircle
                        className="relative"
                        strokeWidth="1"
                        size={17}
                        onClick={() =>
                            setIsPopupVisible(
                                (prevIsPopupVisible) => !prevIsPopupVisible
                            )
                        }
                    />
                    {isPopupVisible && (
                        <Help onClose={() => setIsPopupVisible(false)} />
                    )}
                </div>
                <SearchBar
                    setEmailResponse={setEmailResponse}
                    setWebsiteResponse={setWebsiteResponse}
                />
                {emailResponse && getResponseMessage(emailResponse)}
            </div>
        </div>
    );
}

export default Home;
