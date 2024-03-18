function About() {
    return (
        <div className="flex flex-col items-center dark:bg-zinc-900 h-screen pt-10">
            <div className="max-w-lg">
                <h1 className="text-4xl font-bold font-mono mb-4">About</h1>
                <p className="text-sm font-mono">
                    I created this site to aid me on my job search. Often, if I
                    need to contact a recruiter or employee at a company I'm
                    looking to apply to, it's hard to get their contact info or
                    even get ahold of them on LinkedIn. I also use cold emailing
                    and thus another reason I may need a person's email address.
                </p>
                <p className="my-3 text-sm font-mono">
                    There are a few sites out there that help you find an email
                    such as Hunter.io, what this project is based on, however
                    they only give a limited number of searches before you have
                    to pull out the 'ol credit card. So as I often do, I started
                    thinking about how I could make this myself and I thought,
                    "they are probably just pinging the company's domain to
                    check if an email exists, I could probably write an app to
                    do that for me!" And so birthed this project.
                </p>
                <p className="text-sm font-mono">
                    This project is open source and can be found on my GitHub{" "}
                    <a
                        className="text-red-400 font-mono"
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
