const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

exports.signup = (req, res) => {
    let { firstName, lastName, email, password } = req.body;
    let admin = new Admin({
        firstName,
        lastName,
        email,
        password,
    });
    admin.save()
        .then(() => res.status(200).send(admin))
        .catch((error) => {
            console.log(error);
            return res.status(500).send("ERROR");
        });
};

exports.login = (req, res) => {
    let { email, password } =req.body; 
    Admin.findOne({ email: email}) 
        .then((admin) => {          
            console.info(`Admin with email: ${email} was successfully found!`);
            if(password === admin.password) {
                const token = JWT.sign(               
                    {  
                        email: admin.email,
                    },
                    "JIETSecretKey",           
                    {
                        expiresIn: "1h"
                    }                       
                );
                console.info("Login successful");
                return res.status(200).send({admin, token}); 
            }
            console.warn("Password incorrect");
            return res.status(401).send("Password was incorrect");
        })
        .catch((error) => {
            console.error(`Admin with email: ${email} doesn't exist!`);
            return res.status(404).send(`Admin with email: ${email} doesn't exist!`);
        });
};