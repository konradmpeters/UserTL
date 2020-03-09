
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (req,res,next) => {

    try {

        console.log(res);
        console.log(req);

        if (typeof req.headers.authorization !== "undefined") {


            const token = req.headers.authorization.split(" ")[1];

            // console.log("token:");
            // console.log(token);
    
            //let publicKey = fs.readFileSync('./public.key','utf8');
            let publicKey = fs.readFileSync('./_public.key','utf8');

            const decoded = jwt.verify(token, publicKey);  //"SecretKey123"
            // const decoded = jwt.verify(token, publicKey, (err) => {
            //     console.log(err.message);
            //     res.json({"error": err.message});
            // });
    
            //req.userData = decoded;
            // console.log('req.userData:');
            // console.log(req.userData);

            next();

        }

    } catch (error) {

        res.json({
            message: "Auth failed"
        });

        console.log('message: Auth failed');  

    }
    
}