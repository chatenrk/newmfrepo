const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();

const userModel = require('../models/userModel');
const config = require('../config/database');
const helpers = require('../helpers/helpers.js');

router.post('/register', function (req, res, next) {

    // Check if the password matches the compliance requirements.

    var password = req.body.password;
    if (helpers.checkpwd(password) === "insuff pwd") {
        return res.status(200).json({
            success: false,
            msg: "Password not complaint with specifications.Please check the information popup for more details"
        });
    }


    // Check if the user is already registered, use the email as it is the index of the table

    userModel.getUserByEmail(req.body.email, function (err, data) {
        if (err) {

            res.status(200).json({
                success: false,
                msg: "Error please contact admin"
            });
        } else {

            if (data !== null) {
                // Check if data is empty
                if (data.id) {
                    res.status(200).json({
                        success: false,
                        name: "Duplicate Email",
                        msg: "This email is already registered. Please use the login page"
                    });

                }
            } else {
                let newUser = new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                });

                userModel.addUser(newUser, function (err, callback) {
                    if (err) {
                        if (err.code === 11000) {
                            res.status(200).json({
                                success: false,
                                name: err.name,
                                msg: "This email is already registered. Please login"
                            });
                        } else {
                            res.status(200).json({
                                success: false,
                                name: err.name,
                                msg: err.message
                            });
                        }

                    } else

                    {
                        res.status(200).json({
                            success: true,
                            msg: "User Registered"
                        });
                    }
                });

            }
        }
    });


});

router.post('/authenticate', function (req, res, next) {

    if (mongoose.connection.readyState === 0) {
        res.status(200).json({
            success: false,
            msg: "Unable to connect to database. Please contact Admin"
        });
    } else {
        var username = req.body.username;
        var password = req.body.password;

        userModel.getUserByUsername(username, function (err, user) {

            if (err) throw err;
            if (!user) {
                res.status(200).json({
                    success: false,
                    msg: "User not found. Please check credentials"
                });
            } else {
                userModel.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {

                        var options = {
                            expiresIn: 604800
                        };
                        const token = jwt.sign({
                            user: user.username
                        }, config.secret, options);

                        res.status(200).json({
                            success: true,
                            token: "JWT " + token,
                            user: {
                                id: user._id,
                                name: user.name,
                                username: user.username,
                                email: user.email
                            }
                        });
                    } else {
                        res.status(200).json({
                            success: false,
                            msg: "Incorrect password, please check again"
                        });

                    }
                }); //Compare password close
            }
        }); //getUserByUsername close

    } // mongoose connection check else close
});

router.get('/profile', function (req, res, next) {
    res.send('profile');
});



parseError = function (err) {
    if (err.code === 11000) {

    }
}

//Route to get user details based on the query
router.get('/userdet', async (req, res, next) => {


    var useremail = req.query.email;
    var userfname = req.query.fname;
    var username = req.query.username;
    var query;

    if (useremail) {

        query = {
            email: useremail
        }
    } else if (userfname) {

        query = {
            name: userfname
        }
    } else if (username) {
        query = {
            username: username
        }
    }

    try {
        schemes = await userModel.findOneUserDet(query);
        res.send(schemes);
    } catch (err) {

        return res.status(500).send(err);
    }


});




module.exports = router;