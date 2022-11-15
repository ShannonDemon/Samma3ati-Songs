const User = require('../models/User')

const bcrypt = require('bcrypt');
const salt = 10;

const jwt = require("jsonwebtoken");

async function createUser(req,res) {
    try {
        // Plain Text to Ecrypted String
        let hashedPassword = bcrypt.hashSync(req.body.password, salt)
        console.log(hashedPassword);

        const newUser = await User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        res.json(newUser)
    } catch (err) {
        res.json(err)
    }
}

async function getAllUsers(req, res) {
    try {
        const allUsers = await User.find().populate('tweets')
        res.json(allUsers)
    } catch (err) {
        res.json(err)
    }
}

const auth_sigin_post = async (req, res) =>{
    let {email, password} = req.body;
    console.log(email);

    try{
        let user = await User.findOne({email}); // email: email
        console.log(user);

        if(!user){
            return res.json({message: "User not found"}).status(400);
        }

        // Password Comparison
        const isMatch = await bcrypt.compareSync(password, user.password);
        console.log(password); // Plaintext password
        console.log(user.password); // Encrypted password

        if(!isMatch) {
            return res.json({message: "Password not matched"}).status(401);
        }

        // JWT Token
        const payload = {
            user: {
                id: user._id,
                name: user.name
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 36000000},
            (err, token) => {
                if(err) throw err;
                res.json({token}).status(200);
            }
        )
    } catch (error) {
        console.log(error)
        res.json({message: "You are not loggedin!. Try again later."}).status(400);
    }
} 

module.exports = {
    createUser,
    getAllUsers,
    auth_sigin_post
}