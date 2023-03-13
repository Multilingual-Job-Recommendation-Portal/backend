const Admin = require('../models/admin');

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