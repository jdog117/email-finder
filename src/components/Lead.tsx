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
        <Card className="w-full">
            <div className="flex flex-row items-center p-5">
                <Avatar className="mr-5">
                    <AvatarFallback className="text-3xl">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="w-full">
                    <h1 className="font-semibold">{name}</h1>
                    <p>{message}</p>
                    <div className="flex flex-row justify-start items-center">
                        <p className="">{email}</p>
                        <CheckCircle2
                            className="mt-1 ml-2"
                            color="green"
                            size={15}
                        />
                    </div>
                    {acceptsAll && (
                        <p className="font-thin">Accepts all broski</p>
                    )}
                </div>
            </div>
        </Card>
    );
}
