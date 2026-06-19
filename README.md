# Alexander Vikov Financial Coaching Website

A three-page marketing site for a financial coach. Static, hand-built, and live on a real server with HTTPS.

**Live:** https://vikovfinancial.online

## About

This is a portfolio piece. The idea was simple: a clean, fast site that gets visitors to book a discovery call. I built the pages, did the styling and the copy structure, and handled getting it onto a live server.

## Built with

- HTML, CSS, and plain JavaScript. No framework, no build step.
- Fraunces for the headings, Manrope for the body text, both pulled from Google Fonts.
- Responsive down to mobile, using CSS grid and `clamp()` so things scale instead of breaking at fixed widths.

## Pages

There are three. Home has the hero, the story, the value points, and a preview of the services. Services lays out the four ways to work together. Booking is a discovery-call request form that validates what you type before it would send.

That form checks the input in the browser but doesn't go anywhere yet. Connecting it to a real backend is part of Phase 2 below.

## Structure

```
index.html            home page (root)
styles.css            shared styles
script.js             shared JS: nav, scroll reveal, form validation
logo.svg
Other-Pages/
  services.html
  booking.html
```

One stylesheet and one script, shared across all three pages.

## Deployment

It runs on a Hostinger VPS, served by Nginx, with an HTTPS certificate from Let's Encrypt (so http traffic gets bumped to https automatically). Since it's all static files, there's nothing to restart or rebuild on the server.

## Roadmap

### Phase 2: member accounts for gated articles

The next step makes the site full-stack: a login that puts certain articles behind an account.

No passwords. You type your email, the server emails you a short code, and the code logs you in. Nothing sensitive to store, and no "forgot password" flow to build.

The backend pieces:

- A small database for accounts and what each one can read.
- An endpoint that makes a code, saves it with a short expiry, and emails it.
- An endpoint that checks the code and starts a session if it's valid.
- A cookie-based session so you stay logged in as you move around.
- Protected routes that check you're logged in before serving the gated articles.

The Nginx config is already set up for it. A commented-out block routes `/api/` to a backend app on port 8000, so turning it on is most of the work. Everything else stays static.

Still to decide when I get there: which service actually sends the login emails.

