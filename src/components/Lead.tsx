import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";

interface LeadProps {
    message: string;
    email: string;
    name: string;
    acceptsAll: boolean;
}

export default function Lead({ message, email, name, acceptsAll }: LeadProps) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return (
        //change two columns
        <Card className="w-full flex-initial w-120">
            <div className="flex flex-row w-full items-center p-5">
                <div className="w-25 pr-5">
                    <Avatar>
                        <AvatarFallback className="text-3xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="w-full">
                    <h1 className="font-bold">{name}</h1>
                    <p>{message}</p>
                    <div className="flex flex-row items-center">
                        <p className="w-full">{email}</p>
                        <CheckCircle2
                            className="w-1/4 mt-1"
                            color="green"
                            size={15}
                        />
                    </div>
                    {acceptsAll && <p>Accepts all broski</p>}
                </div>
            </div>
        </Card>
    );
}
