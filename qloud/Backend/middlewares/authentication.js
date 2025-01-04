// const { validateToken} = require('../services/authentication');

// function checkForAuthenticationCookie(){
//     return (req,res, next) =>{
//         const tokenCookieValue = req.cookies?.token
//         //console.log('tokenCookieValue', tokenCookieValue);
//         if(!tokenCookieValue){
//             return next();
//         }
//         //console.log("payload trial")
//         try{
//             const payload = validateToken(tokenCookieValue);
//             req.user = payload; 
//             //console.log("payload", payload)
//         }catch(error) {}
        
//         return next();
//     }
// }

// module.exports = { checkForAuthenticationCookie }