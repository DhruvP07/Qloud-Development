// const { Schema, model } = require('mongoose');
// const { createHmac, randomBytes } = require('crypto');

// const userSchema = new Schema({
//     firstName:{
//         type: String,
//         required: true,
//     },
//     lastName:{
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     salt: {
//         type: String
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role:{
//         type: String,
//         enum: ['USER', 'BUSINESSPERSON', 'ADMIN'],
//         default: "USER"
//     }
// });

// userSchema.pre("save", function(next){
//     const user = this;
//     if(!user.isModified("password")) return;
//     const salt = randomBytes(16).toString();
//     const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
//     this.salt = salt;
//     this.password = hashedPassword;
//     next();
// });

// const User = model('users', userSchema);

// module.exports = { User }