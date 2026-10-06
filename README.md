# Newsline

A news platform built for the Development Platforms course assignment (Option 2: Frontend with Supabase).
Visitors can browse and read articles. Registered users with a confirmed email can log in and submit new articles.

Course: Development Platforms (Noroff)  
Author: Pål Omland Eilevstjønn

## Features

- Register with email and password, with email confirmation (Supabase Auth)
- Log in and log out
- Article list (newest first) and single article view
- Article submission form for logged-in users
- Auth-reactive navigation bar
- Row Level Security: public read, authenticated insert
- Responsive layout for mobile, tablet, and desktop

## Tech stack

- HTML, CSS, and vanilla JavaScript (ES modules)
- Supabase for authentication and PostgreSQL database
- `@supabase/supabase-js` v2 from CDN

## Running locally

The project uses ES modules, so it must be served over HTTP:

1. Configure your Supabase URL and anon key in `js/config.js`.
2. Start a local server:
   - VS Code Live Server on `http://127.0.0.1:5500`
   - Or run `python3 -m http.server 5500`
3. Open the address in your browser.

## AI Usage

- **Claude (Anthropic)**: Clarified PostgreSQL Row Level Security policy syntax for `insert` checks using `auth.uid()`.
- **Claude (Anthropic)**: Debugged wildcard redirect URL configuration for local port 5500 in the Supabase dashboard.
