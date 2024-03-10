import SearchBar from "@/components/SearchBar";
import { useState } from "react";

function Home() {
    const [emailResponse, setEmailResponse] = useState("");
    return (
        <>
            <div className="flex bg-[#F7F9FA] dark:bg-zinc-900 h-screen flex-col items-center w-full pt-8">
                <div>
                    {/* <h1 className="font-bold py-3 text-lg">EMAIL FINDER</h1> */}
                    <SearchBar setEmailResponse={setEmailResponse} />
                    <div className="py-3">{emailResponse}</div>
                </div>
            </div>
        </>
    );
}

export default Home;
