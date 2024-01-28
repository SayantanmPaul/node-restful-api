# URL Shortner

### Design a URL shortener service that takes in a valid URL and returns a shortened url, redirecting the user to the previous provided url.
### Also keep the trak of total visit/clicks of the url.

## Routes
- POST/URL - Generates a new short URL and returns the shortened URL in format example.com/random-id
- GET/:id - Redirects the user to the orginal URL
- GET/URL/analytics/:id - Returns the clicks for the provided shortened id