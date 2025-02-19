# admin-dashboard

## Purpose

This is a simple admin dashboard built, to demonstrate how to manage feature toggles. It included Clerk for authentication, however, this is just for demonstration purposes. As it uses local storage as a database, and authenticating does nothing.

There are multiple feature pages, and billing page, although these are not, and likely will not be implemented, as feature toggles is the sole purpose of this project.

## How to run

1. Clone the repo
2. Run `bun install` to install dependencies
3. Add your Clerk publishable key to `.env.example` and rename it to `.env`
4. Run `bun dev` to start the dev server
