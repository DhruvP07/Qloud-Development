// async function handleUserSignup(req, res){
//     const {fullName, email, password} = req.body;
//         console.log(fullName, email, password);
//         await User.create({
//             fullName,
//             email,
//             password
//         });
//     console.log(result);
//     return res.status(201).json({status: 'success', message: `User added successfully`})
// }