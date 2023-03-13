const Admin = require('../models/admin');

// creating a new admin
exports.createAdmin = (req, res, next) => {
    const admin = new Admin({
        email: req.body.email,
        name: req.body.name
    });
    admin.save().then(createdAdmin => {
        res.status(201).json({
            message: "Admin added successfully",
            adminId: createdAdmin._id
        });
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Creating an admin failed!"
            })
        });
}

// get admin details by email
exports.getAdmin = (req, res, next) => {
    Admin.findOne({ email: req.body.email }).then(admin => {
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: "Admin not found!" });
        }
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching admin failed!"
            })
        });
}