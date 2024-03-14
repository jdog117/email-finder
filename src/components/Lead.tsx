import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
        <Card className="">
            <div className="flex items-center p-5">
                <div className="w-1/4">
                    <Avatar>
                        <AvatarFallback className="text-3xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="w-1/4">
                    <h1>{name}</h1>
                    <p>{message}</p>
                    <p>{email}</p>
                    {acceptsAll && <p>Accepts all broski</p>}
                </div>
            </div>
        </Card>
    );
}
