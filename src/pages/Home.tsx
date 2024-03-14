import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { ErrorCard } from "@/components/ui/errorCard";
import { AlertCircle, HelpCircle } from "lucide-react";
import Help from "@/components/Help";
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
    const [parsedWebsite, setWebsiteResponse] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

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
            //       "mx_records": true,
            //       "smtp_server": true,
            //       "smtp_check": true,
            //       "accept_all": true,
            return (
                <Lead
                    message={response.message.body}
                    email={response.message.email}
                    name={response.message.fullName}
                    acceptsAll={response.message.acceptsAll}
                />
            );
        }

        //     switch (response) {
        //         case "accepts all":
        //             return (
        //                 <Card>
        //                     <div className="p-5">
        //                         <p>
        //                             Email cannot be verified because {parsedWebsite}{" "}
        //                             servers accept all emails
        //                         </p>
        //                         <div className="border mt-5 "></div>
        //                         <p className="text-slate-500 text-sm mt-3">
        //                             Currently implementing feature to suggest an
        //                             email based on company size
        //                         </p>
        //                     </div>
        //                 </Card>
        //             );
        //         case "not exist":
        //             return (
        //                 <Card>
        //                     <div className="p-5">
        //                         <p>Can't find email for this employee</p>
        //                     </div>
        //                 </Card>
        //             );
        //         case "no domain":
        //             return (
        //                 <ErrorCard>
        //                     <div className="p-3 items-center flex flex-row dark:bg-red-900 dark:text-red-50">
        //                         <AlertCircle
        //                             strokeWidth="1"
        //                             color="red"
        //                             size={17}
        //                         />
        //                         <p className="px-3 py-1">
        //                             Domain does not exist, check spelling or try
        //                             another website
        //                         </p>
        //                     </div>
        //                 </ErrorCard>
        //             );
        //         default:
        //             return (
        //                 <Card>
        //                     <div className="p-5">
        //                         <p>Email verified!</p>
        //                         {verificationResponse}
        //                     </div>
        //                 </Card>
        //             );
        //     }
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
                {verificationResponse &&
                    getResponseMessage(verificationResponse)}
            </div>
        </div>
    );
}

export default Home;
