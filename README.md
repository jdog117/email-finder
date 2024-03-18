# Email Finder

[Email Finder](https://email-finder-jc.vercel.app) uses an employee name and company website to create and verify their email address. \
It allows you to check if an email address exists for any employee without having to send a blind email out. Helpful for reaching out to recruiters or employees when applying for jobs. \
Check out the documention [here](docs/email-verification-doc.md) to see how my verficiation server works.

# Project Motivation

I created this site to aid me on my job search. Often, if I need to contact a recruiter or employee at a company I'm looking to apply to, it's hard to get their contact info or even get ahold of them on LinkedIn. I also use cold emailing and thus another reason I may need a person's email address.

There are a few sites out there that help you find an email such as Hunter.io, what this project is based on, however they only give a limited number of searches before you have to pull out the 'ol credit card :( \
So as I often do, I started thinking about how I could make this myself and I thought, "they are probably just pinging the company's domain to check if an email exists, I could probably write an app to do that for me!" And so birthed this project.

While simple in concept and easy to get the individual parts working, getting them all to work together in production on the cloud was a great challenge. Read below to learn more about some that wild journey.

# Features

-   Responsive design
-   Dynamic React elements
-   Custom secure server
-   Color themes

# Technologies

### React + TypeScript + Vite + Vercel

-   Tailwind CSS
-   Eslint + Preiiter
-   Express js

## Hosting

Website is hosted on Vercel and email verification server on a VPS.

## What I Learned

-   how to use Tailwind CSS in a powerful way
-   serverless functions, VPS, self hosting, https/http protocols
-   testing with Vite and React
-   Responsive design with Tailwind

## Feature Requests

-   Use email format patterns based on a companie's size to suggest multiple emails
-   Account creation and lead saving

## Dev

> $ vercel dev

# Development Hell

Ok it wasn't _hell_ but the amount of iterations and late nights I had to go through was pretty gruling.
