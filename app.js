const express = require('express');
const app = express();

//const cors = require('cors');

const morgan = require('morgan');  // morgan is a logger
const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/users');
const appRoutes = require('./apps/appRoutes');

//app.use(morgan('dev'));  // Why dev? 
//app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Prevent CORS errors
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*"); // * opens up to all pages but could restrict by added page url
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTION") {
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    };
    next();  // So that the other routes can take over.
});

app.use('/users', userRoutes);

// Disabled Application Routes
app.use("/apps", appRoutes);
app.use('/', express.static('dist/UserTL'));

module.exports = app;