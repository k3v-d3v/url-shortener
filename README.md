# url-shortener

URL Shortener - A simple URL shortener service using Express, Prisma, and SQLite.

## Getting Started

Run the following commands to get started:

```bash
npm install
npm run migrate
npm start
```

Make curl requests to shorten URLs:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"url": "https://www.google.com"}' http://localhost:3000/shorten
```

Response:

```json
{
  "shortUrl": "http://localhost:3000/<shortId>"
}
```

Visit [root URL](http://localhost:3000/) to see the list of shortened URLs
