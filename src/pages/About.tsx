function About() {
    return (
        <div className="flex flex-col items-center dark:bg-zinc-900 h-screen pt-10">
            <div className="max-w-lg">
                <h1 className="text-4xl font-bold mb-4">About</h1>
                <p className="text-md">
                    I created this site to help me on my job search. Often, if I
                    need to contact a recruiter and employee at a company I'm
                    looking to apply to, its hard to get their info, even
                    messaging on LinkedIn. I also send cold emails and this is
                    another reason I may need a person's email address.
                </p>
                <p className="my-3">
                    There are a few sites out there that help you find an email
                    such as Hunter.io, what this project is based on, however
                    they only give a limited number of searches before you have
                    to pull out your credit card. I thought to myself, "they are
                    probably just pinging the company's domain to check if their
                    guessed email exists, I could probably right an app to do
                    that for me for free." And so birthed this project!
                </p>
                <p>
                    This project is open source and can be found on my GitHub{" "}
                    <a
                        className="text-red-400"
                        href="https://github.com/jdog117/email-finder"
                    >
                        here
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export default About;
