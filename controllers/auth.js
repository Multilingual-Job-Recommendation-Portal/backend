const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();
var google = require('googleapis').google;
var OAuth2 = google.auth.OAuth2;

// get the email of the user by using the google login access token with the google api and then get the user by email
exports.getUserByGoogleLogin = (req, res, next) => {
    const accessToken = req.body.accessToken;
    var oauth2Client = new OAuth2();
    oauth2Client.setCredentials({
        access_token: accessToken
    });
    var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });
    oauth2.userinfo.get(function (err, response) {
        if (err) {
            res.status(500).json({
                message: 'Something went wrong'
            });
        } else {
            const email = response.data.email;
            User.findOne({
                email: email
            }).then(user => {
                if (user) {
                    res.status(200).json({
                        message: 'User found',
                        user: user
                    });
                } else {
                    res.status(404).json({
                        message: 'User not found'
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    message: 'Something went wrong'
                });
            });
        }
    });
}
