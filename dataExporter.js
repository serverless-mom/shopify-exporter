const request = require('request'),
 fs = require('fs'),
 AWS = require('aws-sdk');

var apiKey = process.env.SHOPIFY_API_KEY,
  apiPassword = process.env.SHOPIFY_API_PASSWORD,
  s3Bucket = process.env.S3_BUCKET || 'demotobyfee',
  requestUrlBase = 'https://'+apiKey+':'+apiPassword+'@budboxco.myshopify.com/admin/'

request(requestUrlBase+'orders.json?status=any', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    uploadFile('orderDump.json', body);
  }
});

request(requestUrlBase+'customers/count.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var customerCount = (JSON.parse(body)).count
    if (customerCount < 250){
      request(requestUrlBase+'customers.json?fields=email&limit=250', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          uploadFile('customerDump.json', body);
          var customerDump = (JSON.parse(body)),
            emailDump = customerDump.customers.map(function(customer){return customer.email});
          uploadFile('emailDump.txt', emailDump.splice(','));
        }
      })
    } else {
      console.log("Hey Toby you gotta update this thing, it can't all be done in one request. Total customer count is: "+customerCount)
    }
  }
});
var s3bucket = new AWS.S3({params: {Bucket: s3Bucket}});
function uploadFile(filename, payload){
  fs.readFile('datadump/'+filename, function(err, data){
    var params = {
      Key: Date.now()+filename,
      Body: payload || 'something is up with this app and no data was available to post'
    }
    s3bucket.upload(params,function(err, data){
      if (err) {
          console.log('ERROR MSG: ', err);
      } else {
          console.log('Successfully uploaded data for file ' + filename);
      }
    })
  })
}
