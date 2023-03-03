const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

exports.createUser = (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        religion: req.body.religion,
        disability: req.body.disability,
        category: req.body.category,
        location: req.body.location,
        pastJobs: req.body.pastJobs,
        experience: req.body.experience
    });
    user.save().then(createdUser => {
        res.status(201).json({
            message: 'User added successfully',
            user: {
                ...createdUser,
                id: createdUser._id
            }
        });
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Creating a user failed!"
            })
        });
}

// get the user by email
exports.getUserByEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found!" });
        }
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching user failed!"
            })
        });
}

// get the user by id
exports.getUserById = (req, res, next) => {
    User.findById(req.body.id).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching user failed!"
            })
        });
}
