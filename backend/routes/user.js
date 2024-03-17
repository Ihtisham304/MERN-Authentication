const express = require("express");
const userCon = require('../controllers/user');
const router = express.Router();
const jwt  = require('jsonwebtoken');

const verify = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("check");
        if (!token) {
            return res.json({status: 404,message: "no token"});
        }
        const decoded = await jwt.verify(token,process.env.Key);
        next();
    } catch (error) {
       console.log("You have no token");
    }
}

router.post('/signup',userCon.signUp);
router.post('/login',userCon.login);
router.post('/forgot-pass',userCon.forGot);
router.post('/resetpass/:token',userCon.resetPass);
router.get('/verify',verify,userCon.get);
router.get('/logout',userCon.logout);
module.exports = router;