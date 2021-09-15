import Sequelize from 'sequelize';
import models from '../models/index.js';
import passport from 'passport';

const register = async (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400)
            .json({ message: "Email and pass are required" });

    let newUser = models.Admin.build({
        email: req.body.email,
    });
    try {
        if (req.body.password != req.body.retypePassword)
            throw new Error("Passwords do not match");
        newUser.setPassword(req.body.password);
        let user = await newUser.save();
        if (user != null) {
            // don't send secrets
            user.password = user.passwordSalt = undefined;
            delete user.dataValues["id"];
            
            const token = newUser.generateJwt();
            res.status(201)
                .json({ token, data: user, message: "Account created successfully" });
        } else {
            res.status(400)
                .json({ message: "Error creating new user" });
        }
    } catch (error) {
        if (error instanceof Sequelize.ValidationError)
            return res.status(409)
                .json({ message: "Account already exists" });
        res.status(400) // catch errors such as Passwords do not match
            .json({ message: error.message }); // safe to disclose
    }
}

const login = (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400)
            .json({ message: "Both email and password is required" })

    // this is a function call, to invoke the configured passport strategy in config/passport.js
    passport.authenticate('local', (err, user, info) => { // 'local' is strategy
        let token = null;
        if (err) { // passport returns an error
            console.log(err);
            return res.status(500).json({ message: "An unknown error occured while logging in" });
        }
        if (user instanceof models.Admin) { // we've already logged in the user from config/passport.js
            token = user.generateJwt();
            const { email } = user.toJSON();
            console.log(user.toJSON()); // TODO save in log file
            res.status(200)
                .json({ token, data: { email }, message: "Login successful!" });
        } else {
            res.status(401)
                // why did the authentication fail? For example, was the login incorrect?
                // this error message typically comes from the one set in config/passport.js
                .json(info);
        }
    })(req, res);// we make req and res available to passport
    // this proves this is a function call
}

export { register, login }
