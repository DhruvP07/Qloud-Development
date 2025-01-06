const { User } = require('../models/users');
const { createHmac } = require('crypto');
const { createTokenUser } = require('../services/authentication');

async function handleUserSignup(req, res){
    const {firstName, lastName, email, password} = req.body;
    //console.log(firstName, lastName, email, password);
    try{
        const checkUser = await User.findOne({email});
        //console.log("CheckUser", checkUser);
        if (checkUser) return res.json({status: 'failure', message: 'User already exists'});

        const result = await User.create({
            firstName,
            lastName,
            email,
            password
        });
        //console.log(result);
        return res.status(201).json({status: 'success', message: `User added successfully`})
    }catch(e){
        console.log(e)
        res.status(500).json({status: 'failure', message: 'Internal Server Error'});
    }   
};

async function handleUserSignin(req, res){   
    const {email, password} = req.body;
    //console.log(email);

    try{
        //Check if user exists
        const chechUser = await User.findOne({email});
        if (!chechUser) return res.json({status: 'failure', message: 'User does not exist'});
        //console.log(chechUser);

        //To check if the password is correct
        const salt  = chechUser.salt;
        //console.log(salt);
        const hashedPassword = chechUser.password;
        const userProvidedPassword = createHmac('sha256', salt).update(password).digest('hex');

        if(userProvidedPassword !== hashedPassword) {
            return res.json({status: 'failure', message: 'Incorrect password'})
        }

        //Generating the token.
        const token = createTokenUser(chechUser)


        //return token
        //console.log("token", token)
        return res.json({status: 'success', message: 'User logged in successfully', token, user: chechUser});
    }catch(e){
        console.log(e);
    }
}
module.exports = { handleUserSignup, handleUserSignin };