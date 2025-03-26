//console.log(trial)
const { Business } = require('../models/businessModel');
const { createHmac, randomBytes } = require('crypto');
const { createTokenUser, validateToken } = require('../services/authentication');
const bcrypt = require('bcrypt');

var nodemailer = require('nodemailer');

// Password validation regex
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

async function handleBusinessPersonSignup(req, res){
    const {firstName, lastName, email, password} = req.body;
    //console.log(firstName, lastName, email, password);

    try{
        const checkBusinessPerson = await Business.findOne({email});
        //console.log("CheckUser", checkUser);
        if (checkBusinessPerson) return res.json({status: 'failure', message: 'Business Person already exists'});

        // Check if password meets the requirements
        if (!passwordPattern.test(password)) {
            return res.json({
                status: 'failure',
                message: 'Password must be 9-15 characters long, start with a capital letter, include a special character, and contain at least one number.'
            });
        }

        const salt = 12;
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await Business.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role: "BUSINESSPERSON"
        });
        //console.log(result);
        return res.status(201).json({status: 'success', message: `Business added successfully`})
    }catch(e){
        console.log(e)
        res.status(500).json({status: 'failure', message: 'Internal Server Error'});
    }   
};

async function handleBusinessPersonSignin(req, res){   
    const {email, password} = req.body;
    //console.log(email);

    try{
        //Check if user exists
        const chechBusinessPerson = await Business.findOne({email});
        if (!chechBusinessPerson) return res.json({status: 'failure', message: 'Business Person does not exist'});
        //console.log(chechUser);

        //To check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, chechBusinessPerson.password); // Assuming `password` in the database is hashed
        if (!isPasswordCorrect) {
            return res.json({ status: 'failure', message: 'Incorrect password' });
        }

        //Generating the token.
        const token = createTokenUser(chechBusinessPerson)

        //return token
        //console.log("token", token)
        return res.json({status: 'success', message: 'Business Person logged in successfully', token, businessPerson: chechBusinessPerson});
    }catch(e){
        console.log(e);
    }
}

async function handleBusinessPersonforgotPassword(req, res){
    const { email } = req.body;
    //console.log(email);
    Business.findOne({email:email})
    .then(businessPerson=>{
        if(!businessPerson){
            return res.json({status: "Business Person does not exist"});
        }
        const token = createTokenUser(user)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'dhruvrp1703@gmail.com',
              pass: 'rxcpitqjkyojenmz'
            }
          });
          
          var mailOptions = {
            from: 'dhruvrp1703@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:8080/reset-password/${Business._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              //console.log(error);
            } else {
              //console.log('Email sent: ' + info.response);
              return res.json({message: "email sent", businessPerson, token})
            }
          });
    })
}

async function handlebusinessPersonResetPassword(req, res) {
    const {id, token} = req.params;
    const {password} = req.body;
    const businessPerson = validateToken(token);
    //Check if the token is valid of not
    if (!businessPerson) return res.json({status: 'failure', message: 'invalid Token'});

    //Hashing password.
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);
    await Business.findByIdAndUpdate({_id:id}, { password: hashedPassword});
    return res.json({status:"success", message: "Password Updated Successfully"});
}

exports.selectBusiness = async (req, res) => {
    try {
      const { userId, selection } = req.body;
  
      if (!userId || !selection) {
        return res.status(400).json({ error: "User ID and selection are required" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.selection = selection;
      await user.save();
  
      res.json({ message: "Selection updated successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { handleBusinessPersonSignup, handleBusinessPersonSignin, handleBusinessPersonforgotPassword, handlebusinessPersonResetPassword, selectBusiness};
