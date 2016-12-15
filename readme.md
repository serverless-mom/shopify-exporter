# shopify exporter
A little worker to grab backup data from Shopify and save in on S3

## requirements
* shopify
* Heroku
* AWS S3

## Install/config
1. clone me
2. add as a heroku app
3. Add a 'private app' to shopify and get your API key and password
3. give that heroku app the following vars:
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* SHOPIFY_API_KEY
* SHOPIFY_API_PASSWORD
* S3_BUCKET
4. schedule!
