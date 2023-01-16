### Implementation process

1. Scrape 3 websites get product info and technical specs
2. return the data scraped
3. Create temporary endpoint to fetch the data and store it in db
4. Create endpoints to retrieve the data
5. Swagger doc for endpoints
6. Change scraping to work dynamically
7. Create backround job for scraping
8. Change implementation to TS
9. Dockerize

### Extra

1. Research crawling mechanism ?
2. Research captcha avoidance ?

### Considerations

1. Different websites have different html structure. How to have this be dynamic ?
2. How to dockerize app ?
3. How backround job and data storing/retrieval from db work when it takes too long?
