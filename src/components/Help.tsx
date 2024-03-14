import { XCircle } from "lucide-react";

function Help({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute bg-background p-5 border shadow-md rounded-sm left-5 top-0 transition-all duration-200 ease-linear">
            <p>
                Enter an employee name and the company they work at and Email
                Finder will attempt to find and verify their email address
            </p>
            <XCircle
                className="mt-3"
                strokeWidth={1}
                size={15}
                onClick={onClose}
            />
        </div>
    );
}

export default Help;
