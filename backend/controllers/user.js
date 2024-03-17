const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.signUp = async (req, res) => {
    const formdata = req.body;

    try {
        const checkUser = await UserModel.findOne({ email: formdata.email })
        if (checkUser) {
            return res.json({ message: "user already exists" });
        }
        const hashpass = await bcrypt.hash(formdata.password, 10);
        const newuser = await UserModel.create({ ...formdata, password: hashpass });
        return res.json({ status: 200, message: "SignUp SuccessFully" });
    } catch (error) {
        return res.json(error);
    }
}
exports.login = async (req, res) => {
    const formdata = req.body;
    try {
        const checkUser = await UserModel.findOne({ email: formdata.email });
        if (!checkUser) {
            return res.json({ message: "Sign Up First" });
        }
        const checkpass = await bcrypt.compare(formdata.password, checkUser.password);
        if (!checkpass) {
            return res.json({ message: "invalid password" });
        }
        const token = jwt.sign({ username: checkUser.username }, process.env.Key, { expiresIn: "1h" });
        res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
        return res.json({ status: true, message: "login success", email: checkUser.email });
    } catch (error) {
        console.log("erro while login ", error);
    }
}
exports.forGot = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ message: "User with this emailis no registered" });
        }
        const token = jwt.sign({ id: user._id }, process.env.Key, { expiresIn: "5m" });
        var transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.AddminGmail,
                pass: process.env.AddminPass
            }
        });
        var mailOptions = {
            from: process.env.AddminGmail,
            to: user.email,
            subject: 'reset password',
            text: `http://localhost:5173/resetpass/${token}`
        };

        try {
            await transporter.sendMail(mailOptions)
            return res.json({ status: 200, message: "email send to you" })
        }
        catch (e) {
            console.log(e.message)
        }

    } catch (error) {
        console.log(error);
        res.json({ message: "error in mail send ", error })
    }
}
exports.resetPass = async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.Key);
        const id = decoded.id;
        const hashpass = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate({ _id: id }, { password: hashpass });
        res.json({ status: 200, message: "your Password is change" });
    } catch (error) {
        res.json({ message: "erro while newpass add" });
    }
}
exports.get = async (req, res) => {
    try {
        return res.json({ status: 200, message: "authorized" })

    } catch (error) {
        res.json({ message: "expired token login first" })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token');
    console.log("logout check");
    try {
        return res.json({ status: 200, message: "you are logout" })
    } catch (error) {
        return res.json({ message: "error logout" })
    }
}