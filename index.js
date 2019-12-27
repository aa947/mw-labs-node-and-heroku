
var express = require('express');
var app = express();
const http = require ('http');
var app = express();
var path=require('path');
var bodyParser = require("body-parser");
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));

//const hostname = 'mw-labs.herokuapp.com';
const hostname = '0.0.0.0';
const port = 3000;
//running

const server = http.createServer((req, res) => {
   // console.log(req.headers);
   console.log('request for ' +req.url+ ' by method ' + req.method );


   if (req.method == 'GET') {
       var fileUrl;
       if (req.url == '/') { fileUrl = '/index.html'; } else { fileUrl = req.url; }

       var filePath = path.resolve('./public' + fileUrl);
       const fileExt = path.extname(filePath);
      // if (fileExt == '.html'){
           fs.exists(filePath, (exists) => {
               if(!exists){
                   req.statusCode = 404;
                   res.setHeader('Content-Type', 'text/html');
                   res.end ('<html><body><h1>Error 404: ' +fileUrl + ' not found</h1></body></html>');
                   return ;
               }
               res.statusCode = 200;
               //res.setHeader('Content-Type', 'text/html');
               fs.createReadStream(filePath).pipe(res);
            });
    } 
       else {
           res.statusCode=404;
           res.setHeader('Content-Type', 'text/html');
           res.end ('<html><body><h1>Error 404: ' +fileUrl + ' not found</h1></body></html>');
       }

// //   }
//    else {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<html><body><h1>Error 404: ' + req.method + 
//             ' not supported</h1></body></html>');
// }
})







server.listen(process.env.PORT || 5000
, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});