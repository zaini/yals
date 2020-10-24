# yals - yet another link shortener (w/ custom URLs)

A link shortener that allows you to set custom URLs, expiration dates and manage them from your account.

http://yals.zreo.me/

# Features

* shorten any link

* create an account to manage your links

* set expiry dates for your links

* delete your links whenever you want

* easily share your links with a QR code

# Soon

* more functionality to accounts including account settings (change password etc.)

* analytics for your links, such as # of clicks, times, location etc. to better understand who's using your links

# Setup

You'll need a ```.env``` with the following variables ```MONGODB_URI```, ```SESSION_SECRET``` (any string for redis to use), ```REACT_APP_DOMAIN``` (the domain for your link shortener e.g. ```yals.zreo.me```), ```REACT_APP_GOOGLE_CLIENT_ID``` (Google API key for Google authentication), ```REDISTOGO_URL``` (your redis to go link)

# Other

I tried to plan and keep track of the project using [Trello.](https://trello.com/b/CNWKN2k5/linkshortener) But I mostly just used Notepad documents.

## Here's the stack I used:

* Frontend: React, Chakra UI

* Backend: Node.js/Express, Apollo GraphQL (first time using it, I much prefer it to a RESTful API), Mongoose

* Data: MongoDB, Redis (not sure if i'm using it right, but it's working for storing sessions)

* Forms: react-hook-form (prefer this over formik)

* Hosting: Heroku (tried Vercel and gave up on DigitalOcean)