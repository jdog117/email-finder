import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Bar() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="domain" placeholder="website" />
            <Button type="submit">Submit</Button>
        </div>
    );
}

export default Bar;
