
const express = require('express');
const appRouter = express.Router();

const path = require('path');

// http://localhost:3002/app/AppList
appRouter.get('/UserTL',(req,res)=>{
    res.sendFile(path.join(__dirname,'..', '/dist/UserTL/index.html'));
});

module.exports = appRouter;