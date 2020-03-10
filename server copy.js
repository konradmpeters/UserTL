

const app = require('./app');
//const Port = process.env.port || 443;  //3443
const http = require('http');
const https = require('https');
const express = require('express');
const fs = require('fs');

var domain = 'localhost';

app.get('*', function(req, res){
    // redirect to HTTPS
    res.redirect('https://' + domain + req.path);
});

http.createServer(app).listen(80, function(){
    console.log('HTTP listening on port 80');
});

// app.get('/', (req, res) => {
//     console.log('Hello HTTPS!');
//     res.send('Hello HTTPS!');
// })

//var appSecure = express();
// configure your app here

var options = {
//   key: fs.readFileSync('ssl_key.pem'),
//   cert: fs.readFileSync('ssl_cert.crt')
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

https.createServer(options, app).listen(3443, function(){
    console.log('HTTPS listening on port 443');
});

// https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
// }, app).listen(Port, () => {
//     console.log(`\nApp listening https://localhost:${Port}/ `);
// })

// http://localhost:3443/apps/UserTL
//app.listen(Port, () => console.log(`\nApp listening http://localhost:${Port}/apps/UserTL`));