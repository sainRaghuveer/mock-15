const jwt = require("jsonwebtoken");
require('dotenv').config();

const Authentication = (req, res, next) => {
    try {

        const token = req.headers.normal_token || "";

        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (err) {
                res.status(401).send({ "Message": "Please Login First" })
            }
            else {
                // const Userrole = decoded?.UserRole
                const UserIds = decoded?.UserId
                // req.body.Role = Userrole
                req.body.UserId = UserIds
                next();
            }
        })
    } catch (error) {
        res.status(401).send("You are not authorized to access this")
    }

}

module.exports = {
    Authentication
}