# Email Finder

Enter person's name and company they work at and this site will return any working email addresses. \
Using email format patterns based on a companie's size it guesses multiple emails and verifies them by hitting their mail servers. \
This allows you to check if the guessed email address exists without having to send a blind one out.
Check out the documention for the email verification process [here](docs/email-verification-doc.md).

## Project Motivation

I created this site to help me in my job search. Often, if I need to contact a recruiter and employee at a company I'm looking to apply to, its hard to get their info, even messaging on LinkedIn. I also send cold emails and this is another reason I may need a person's email address.

There are a few sites out there that help you find an email such as Hunter.io, what this project is based on, however they only give a limited number of searches before you have to pull out your credit card. \
I thought to myself, "they are probably just pinging the company's domain to check if their guessed email exists, I could probably right an app to do that for me for free." And so birthed this project!

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Feature Requests

-   Script that scrapes the domain for a relevant email
-   LinkedIn sourcing features

# Dev

> npm run dev \
> http://localhost:5173/ \
> node server.js
