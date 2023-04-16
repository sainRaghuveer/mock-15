const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { userModel } = require('../models/user.model');

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userAlready = await userModel.findOne({ email });
        if (userAlready) {
            res.status(200).send({ "msg": "user already exists", "user": userAlready })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).send({ "msg": "Something went wrong" })
                } else {
                    const newUser = new userModel({
                        email,
                        password: hash
                    });
                    await newUser.save();
                    res.status(200).send({ "msg": "User registered successfully", "user": newUser })
                }
            });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
        console.log(error.message)
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ UserId: user._id }, process.env.secret, { expiresIn: "1h" });
                    res.status(200).send({ "msg": "login successful", "token": token, "user": user })
                } else {
                    res.status(400).send({ "msg": "Incorrect password or email address" })
                }
            })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
        res.send(error.message);
    }
})

module.exports = {
    userRouter
}