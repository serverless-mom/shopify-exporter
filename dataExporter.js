var request = require('request'),
 fs = require('fs');

var apiKey = process.env.SHOPIFY_API_KEY,
  apiPassword = process.env.SHOPIFY_API_PASSWORD,
  requestUrlBase = 'https://'+apiKey+':'+apiPassword+'@budboxco.myshopify.com/admin/'

request(requestUrlBase+'orders.json?status=any', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFile('datadump/orderDump.json', body, function (err) {
      if (err) return console.log(err);
      console.log('data has been dumped to OrderDump.json');
    });
  }
});

request(requestUrlBase+'customers/count.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var customerCount = (JSON.parse(body)).count
    if (customerCount < 250){
      request(requestUrlBase+'customers.json?fields=email&limit=250', function (error, response, body) {
        if (!error && response.statusCode == 200) {
              fs.writeFile('datadump/customerDump.json', body, function (err) {
                if (err) return console.log(err);
                console.log('Customer data has been dumped to customerDump.json');
              });
          var customerDump = (JSON.parse(body))
          fs.writeFile('datadump/emailDump.txt', '', function (err) {
            if (err) return console.log(err);
          });
          customerDump.customers.forEach(function(customerRecord){
            fs.appendFile('datadump/emailDump.txt',customerRecord.email+',', function(err){
              if (err) return console.log(err);
            });
          })

        }
      })
    } else {
      console.log("Hey Toby you gotta update this thing, it can't all be done in one request. Total customer count is: "+customerCount)
    }
  }
});