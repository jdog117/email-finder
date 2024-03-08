import SearchBar from "@/components/SearchBar";

function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full pt-8">
                <div>
                    <h1 className="font-bold py-3 text-lg">EMAIL FINDER</h1>
                    <SearchBar />
                </div>
            </div>
        </>
    );
}

export default Home;
