const { User } = require('../models/users');

async function handleUserSignup(req, res){
    const {firstName, lastName, email, password} = req.body;
        console.log(firstName, lastName, email, password);
        const result = await User.create({
            firstName,
            lastName,
            email,
            password
        });
    console.log(result);
    return res.status(201).json({status: 'success', message: `User added successfully`})
}

module.exports = { handleUserSignup };