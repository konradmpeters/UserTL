

const app = require('./app');
const Port = process.env.port || 3443;  //443
const https = require('https');
const fs = require('fs');

app.get('/', (req, res) => {
    console.log('Hello HTTPS!');
    res.send('Hello HTTPS!');
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(Port, () => {
    console.log(`\nApp listening https://localhost:${Port}/ `);
})

// http://localhost:3443/apps/UserTL
//app.listen(Port, () => console.log(`\nApp listening http://localhost:${Port}/apps/UserTL`));