const User = require("../models/User");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

exports.signup = (req, res) => {
    let { firstName, lastName, email, password, dob } = req.body;
    let user = new User({
        firstName,
        lastName,
        email,
        password,
        dob,
    });
    user.save()
        .then(() => res.status(200).send(user))
        .catch((error) => {
            console.log(error);
            return res.status(500).send("ERROR");
        });
};

exports.login = (req, res) => {
    let { email, password } =req.body; 
    User.findOne({ email: email}) 
        .then((user) => {          
            console.info(`User with email: ${email} was successfully found!`);
            if(password === user.password) {
                const token = JWT.sign(               
                    {  
                        email: user.email,
                    },
                    "JIETSecretKey",           
                    {
                        expiresIn: "1h"
                    }                       
                );
                console.info("Login successful");
                return res.status(200).send({user, token}); 
            }
            console.warn("Password incorrect");
            return res.status(401).send("Password was incorrect");
        })
        .catch((error) => {
            console.error(`User with email: ${email} doesn't exist!`);
            return res.status(404).send(`User with email: ${email} doesn't exist!`);
        });
};

exports.getUserById = (req, res) => {
    let id = req.params.id;
    id = mongoose.Types.ObjectId(id);
    User.findOne({ _id: id})
    .then((user) => {
        if(user){
            console.info("User found!");
            return res.status(200).send(user);
        }
        console.error("User not found!");
        return res.status(400).send("NOT FOUND");
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).send("ERROR");
    });;
};

exports.postBlog = (req, res) => {
    let { heading, body, userID } = req.body;
    let blog = new Blog({
        heading,
        body,
        userID,
    });
    blog.save()
    .then(() => res.status(200).send(blog))
        .catch((error) => {
            console.log(error);
            return res.status(500).send("ERROR");
        });
};

exports.getBlog = (req, res) => {
    let { heading, userID } = req.body;
    Blog.findOne({ userID: userID}) 
        .then((blog) => {        
            console.info(`Blog with userID: ${userID} was successfully found!`);
            if(heading === blog.heading) {
                const token = JWT.sign(               
                    {  
                        userID: blog.userID,
                    },
                    "JIETSecretKey",           
                    {
                        expiresIn: "1h"
                    }                       
                );
                console.info("Blog found successfully");
                return res.status(200).send({blog, token}); 
            }
            console.warn("Heading incorrect");
            return res.status(401).send("Heading was incorrect");
        })
        .catch((error) => {
            console.error(`Blog with userID: ${userID} doesn't exist!`);
            return res.status(404).send(`Blog with userID: ${userID} doesn't exist!`);
        });
};