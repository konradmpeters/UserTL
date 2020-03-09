// const express = require('express');
// const router = express.Router();

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const sql = require("mssql/msnodesqlv8");
const connPool = require('../connection');



//router.get('/GetAll', (req,res,next) => {
exports.GetAll = (req,res,next) => {

    console.log(res);
    console.log(req);    

    connPool.connect(err => {
        if (err) {

            res.send(err);
            console.log(err);

        } else {

            const request = new sql.Request(connPool);

            request.execute('UserGetAll', (err, result) => {

                if(err){
                    res.status(404).json({
                        message: err.message
                    });
                } else {
                    //console.log(result);
                    res.json(result.recordset);
                    connPool.close();
                }

            });

        }
    });
}
//});


//router.post('/UserLogin', (req,res,next) => {
exports.UserLogin = (req,res,next) => {

    connPool.connect(err => {
        if (err) {

            res.send(err);
            console.log(err);

        } else {

            const request = new sql.Request(connPool);

            console.log(req.body.UserEmail);
            request.input('UserEmail',sql.NVarChar(75), req.body.UserEmail);

            request.execute('UserLogin', (err, result) => {

                if(err){
                    res.status(404).json({
                        message: err.message
                    });
                } else {


                    if (result.recordset.length > 0) {

                        if ( bcrypt.compareSync(req.body.UserPassword,result.recordset[0].UserPassword) &&
                            req.body.UserEmail == result.recordset[0].UserEmail) {

                            //let publicKey = fs.readFileSync('./public.key','utf8');
                            let publicKey = fs.readFileSync('./_public.key','utf8');

                            const token = jwt.sign({
                                UserEmail: result.recordset[0].UserEmail,
                                UserID: result.recordset[0].UserID
                            }, publicKey,
                            {
                                expiresIn: "1h"
                            });

                            console.log("token:");
                            console.log(token);
                            console.log("public Key:");
                            console.log(publicKey);
                           

                            console.log('Success');
                            console.log(result.recordset[0].UserPassword);
                            //res.json(result.recordset);

                            res.json({
                                message: "Auth successful",
                                token: token,
                                data: result.recordset[0]
                            });


                        } else {
                            console.log('Not Allowed');
                            res.status(401).json({
                                message: "Auth failed"
                            });
                        }

                    } else {
                        console.log('Not Allowed');
                        res.status(401).json({
                            message: "Auth failed"
                        });
                    }

                }

                connPool.close();

            });

        }
    });
}
//});


// router.post('/UserSave', (req,res,next) => {
exports.UserSave = (req,res,next) => {

    connPool.connect(err => {

        if (err) {



            res.status(404).json({
                err: "404 error",
                message: err.message
            });

            res.send(err);
            console.log(err);

        } else {

            console.log("No Error yet");

            const request = new sql.Request(connPool);

            console.log(req.body.UserID);
            console.log(req.body.UserEmail);
            console.log(req.body.UserPassword);
            console.log(req.body.Group);
            console.log(req.body.FirstName);
            console.log(req.body.LastName);
            console.log(req.body.New_UserID);

            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(req.body.UserPassword, salt);

            request.input('UserID',sql.Int, req.body.UserID);
            request.input('UserEmail',sql.NVarChar(75), req.body.UserEmail);
            request.input('UserPassword',sql.Text, hashedPassword );
            request.input('Group',sql.NVarChar(75), req.body.Group);
            request.input('FirstName',sql.NVarChar(75), req.body.FirstName);
            request.input('LastName',sql.NVarChar(75), req.body.LastName);
            request.input('New_UserID',sql.Int, req.body.New_UserID);
            
            request.execute('UserSave', (err, result) => {

                if(err){
                    res.status(404).json({
                        err: "404 error",
                        message: err.message
                    });
                } else {

                    //console.log(result);

                    console.log(result.recordset[0]);
                    res.json(result.recordset[0]);
                    connPool.close();
                }

            });

        }
    });
};
//});


//router.delete('/:UserID', checkAuth, (req,res,next) => {

exports.UserDeleteById = (req,res,next) => {

    connPool.connect(err => {
        if (err) {
            console.log(err);
        } else {

            const request = new sql.Request(connPool);

            console.log(req.token);

            console.log("No Errors Yet!");
            console.log(req.params);

            request.input('UserID',sql.Int, req.params.UserID);
 
            request.execute('UserDeleteById', (err, result) => {

                if(err){

                    res.status(404).json({
                        message: err.message
                    });
                    console.log('message:' + err.message);  

                } else {
                    
                    res.json(req.params);
                    console.log(req.params);
                    connPool.close();
                }


            });

        }


    });


};

//});


// exports.UserLogout = (req,res,next) => {


//     try {

//         if (typeof req.headers.authorization !== "undefined") {

//             const token = req.headers.authorization.split(" ")[1];

//             console.log("token:");
//             console.log(token);
    
//             let publicKey = fs.readFileSync('./_public.key','utf8');

//             //const decoded = jwt.verify(token, publicKey);  //"SecretKey123"
//             // const decoded = jwt.verify(token, publicKey, (err) => {

//             //     console.log(err.message);
//             //     res.json({"error": err.message});

//             // });

//             const token2 = jwt.sign({
//                 UserEmail: req.userData.UserEmail,   //result.recordset[0].UserEmail
//                 UserID: req.userData.UserID          //result.recordset[0].UserID
//             }, publicKey,
//             {
//                 expiresIn: "0" //10m
//             });

//             //const decoded2 = jwt.verify(token2, "NewToken");

//             console.log('token2:');
//             console.log(token2);
    
//             //req.userData = decoded2;

//             token = token2;

//             next();

//         }

//     } catch (error) {

//         const token = req.headers.authorization.split(" ")[1];

//         console.log("token:");
//         console.log(token);

//         console.log(error);

//         res.json({
//             message: "Auth failed"
//         });

//         console.log('message: Auth failed');  

//     }


    
// };