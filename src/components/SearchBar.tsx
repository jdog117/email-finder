import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SearchBar() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="domain" placeholder="website" />
            <div className="flex-none h-10 border border-input bg-background px-3 py-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                @
            </div>
            <Input type="employee" placeholder="name" />
            <Button type="submit">Find</Button>
        </div>
    );
}

export default SearchBar;
