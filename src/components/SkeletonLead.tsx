import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

export default function SkeletonLead() {
    return (
        <Card className="w-full bg-card mt-3">
            <div className="flex flex-col sm:flex-row sm:items-center p-5">
                <Skeleton className="mr-2 md:mr-5 h-16 w-16 md:h-20 md:w-20 rounded-full"></Skeleton>
                <div className="flex-grow p-2 sm:p-0">
                    <Skeleton className="h-5 w-1/2 flex-grow mt-2"></Skeleton>
                    <Skeleton className="h-5 w-3/4 flex-grow mt-2"></Skeleton>
                    <Skeleton className="h-5 w-3/4 flex-grow mt-2"></Skeleton>
                </div>
                <div className="w-full sm:w-auto mt-4 sm:mt-0">
                    <Skeleton className="h-8 w-full sm:w-auto">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    </Skeleton>
                </div>
            </div>
        </Card>
    );
}
