const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

exports.createUser = (req, res, next) => {
    const user = new User({
        Misid: req.body.Misid,
        BatchId: req.body.BatchId,
        CandidateId: req.body.CandidateId,
        CandidateName: req.body.CandidateName,
        Email: req.body.Email,
        PanNumber: req.body.PanNumber,
        DateOfBirth: req.body.DateOfBirth,
        Gender: req.body.Gender,
        Disability: req.body.Disability,
        Address: req.body.Address,
        StateName: req.body.StateName,
        DistrictName: req.body.DistrictName,
        MandalName: req.body.MandalName,
        VillageName: req.body.VillageName,
        Pincode: req.body.Pincode,
        KnownName: req.body.KnownName,
        PreferredJobLocation: req.body.PreferredJobLocation,
        MaritalStatusName: req.body.MaritalStatusName,
        TalentName: req.body.TalentName,
        SkillTyping: req.body.SkillTyping,
        PrevTrainingProviderName: req.body.PrevTrainingProviderName,
        SkillsCovered: req.body.SkillsCovered,
        TotExpYears: req.body.TotExpYears,
        TotExpMonths: req.body.TotExpMonths,
        CDate: req.body.CDate,
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
    User.findOne({ Email: req.query.email }).then(user => {
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
    User.findById(req.query.id).then(user => {
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

// update user details
exports.updateUser = async (req, res, next) => {
    const userId = req.body._id;
    const user = {
        Misid: req.body.Misid,
        BatchId: req.body.BatchId,
        CandidateId: req.body.CandidateId,
        CandidateName: req.body.CandidateName,
        Email: req.body.Email,
        PanNumber: req.body.PanNumber,
        DateOfBirth: req.body.DateOfBirth,
        Gender: req.body.Gender,
        Disability: req.body.Disability,
        Address: req.body.Address,
        StateName: req.body.StateName,
        DistrictName: req.body.DistrictName,
        MandalName: req.body.MandalName,
        VillageName: req.body.VillageName,
        Pincode: req.body.Pincode,
        KnownName: req.body.KnownName,
        PreferredJobLocation: req.body.PreferredJobLocation,
        MaritalStatusName: req.body.MaritalStatusName,
        TalentName: req.body.TalentName,
        SkillTyping: req.body.SkillTyping,
        PrevTrainingProviderName: req.body.PrevTrainingProviderName,
        SkillsCovered: req.body.SkillsCovered,
        TotExpYears: req.body.TotExpYears,
        TotExpMonths: req.body.TotExpMonths,
        CDate: req.body.CDate,
        role: req.body.role
    };

    const updateUserData = await User.findByIdAndUpdate(userId, user, { new: true });
    if (!updateUserData) {
        res.status(500).json({
            message: "Couldn't update user!"
        })
        return;
    }

    res.status(200).json({
        message: "Update successful!",
        user: updateUserData
    });
}


// delete user by email
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ Email: req.body.email }).then(result => {
        if (result.deletedCount == 1) {
            res.status(200).json({ message: "Deletion successful!" });
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Deleting user failed!"
            })
        });
}

// All user
exports.getAllUsers = (req, res, next) => {
    User.find().then(documents => {
        res.status(200).json({
            message: 'Users fetched successfully!',
            users: documents
        });
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching users failed!"
            })
        });
}