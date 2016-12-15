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

## Special Thanks/further reading
* [Shopify API](https://help.shopify.com/api) has more possible endpoints you might like to hit
* Heroku is deservedly famed for [great docs](https://devcenter.heroku.com/articles/s3-upload-node#uploading-directly-to-s3) but I didn't actually find a guide to S3 uploads that was *quite* as simple as I was going for, but anyhoo still helpful.
* Matt Popovich wrote a great walkthrough for [hosting a twitter bot on Heroku](https://medium.com/@mattpopovich/how-to-build-and-deploy-a-simple-twitter-bot-super-fast-with-node-js-and-heroku-7b322dbb5dd3#.k5nsqou1g) and I certainly couldn't have knocked this out in a few hours without that guide.
