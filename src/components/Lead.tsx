import { Card } from "@/components/ui/card";

interface LeadProps {
    message: string;
    email: string;
    name: string;
    acceptsAll: boolean;
}

export default function Lead({ message, email, name, acceptsAll }: LeadProps) {
    return (
        <Card>
            <h1>Lead</h1>
            <p>{message}</p>
            <p>
                {email} {name}
            </p>
            {acceptsAll && <p>Accepts all broski</p>}
        </Card>
    );
}
