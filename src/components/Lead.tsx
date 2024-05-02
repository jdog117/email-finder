import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

interface LeadProps {
    message: string;
    email: string;
    name: string;
    acceptsAll: boolean;
}

export default function Lead({ message, email, name, acceptsAll }: LeadProps) {
    email = email.toLowerCase();
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    const capFullName = name.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    return (
        //change two columns
        <Card className="w-full bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center p-5">
                <Avatar className="mr-2 md:mr-5 h-16 w-16 md:h-20 md:w-20">
                    <AvatarFallback className="text-3xl">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-grow p-2 sm:p-0">
                    {email && (
                        <h1 className="font-semibold text-lg">{capFullName}</h1>
                    )}
                    <p>{message}</p>
                    <div className="flex flex-row items-center my-2 sm:my-0">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <p
                                        onClick={() =>
                                            navigator.clipboard.writeText(email)
                                        }
                                    >
                                        {email}
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Click to copy</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className="mt-1 ml-2">
                            {email && (
                                <Popover>
                                    <PopoverTrigger>
                                        <CheckCircle2
                                            color={
                                                acceptsAll ? "orange" : "green"
                                            }
                                            size={15}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto">
                                        {/* prettier-ignore */}
                                        <p>
                                        MX Records:&nbsp;&nbsp;<span className="text-green-700">PASS</span> <br />
                                        SMPT Server: <span className="text-green-700">PASS</span> <br />
                                        SMTP Check: <span className="text-green-700">PASS</span> <br />
                                        Accept All:&nbsp;&nbsp;&nbsp;&nbsp;<span className={acceptsAll ? "text-orange-400" : "text-green-700"}>{acceptsAll ? "TRUE" : "FALSE"}</span>
                                    </p>
                                        <div className="border mt-3"></div>
                                        <p className="text-green-700 font-thin mt-1">
                                            All email formats tested
                                        </p>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    </div>
                    {acceptsAll && (
                        <div className="flex items-center">
                            <p className="font-thin">Email is&nbsp;</p>
                            <HoverCard>
                                <HoverCardTrigger className="font-thin underline decoration-1">
                                    accept all
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    This domain will report any email under the
                                    domain as valid. So we cannot verify if the
                                    email exists, however, we reccomend this
                                    email based on the company size
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    )}
                </div>

                <div className="w-full sm:w-auto mt-4 sm:mt-0">
                    {email && (
                        <HoverCard>
                            <HoverCardTrigger>
                                <Button className="text-xs h-8 w-full sm:w-auto">
                                    Save as lead
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-auto">
                                <p>Coming soon</p>
                            </HoverCardContent>
                        </HoverCard>
                    )}
                </div>
            </div>
        </Card>
    );
}
