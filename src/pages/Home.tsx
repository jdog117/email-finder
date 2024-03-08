import SearchBar from "@/components/SearchBar";

function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <div>
                    <h1 className="font-bold">Email Finder</h1>
                    <SearchBar />
                </div>
            </div>
        </>
    );
}

export default Home;
