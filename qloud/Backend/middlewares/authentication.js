const { validateToken } = require('../services/authentication')

function checkForAuthentication(req,res, next){
    const tokenCookie = req.headers.authorization?.split('Bearer ')[1];
    console.log('tokenCookie, auth/middleware',tokenCookie)
    req.user = null;
    if (!tokenCookie) return next();

    const token = tokenCookie
    const user = validateToken(token);
    console.log("User", user);
    req.user = user;

    //console.log(req.user)
    return next();
}

function restrictTo(roles = []){
    return function(req, res, next){
        console.log("restricted To");
        console.log(req.user);
        if (!req.user) return res.json({status: 'failure', message: 'Required Login'});
        if(!roles.includes(req.user.role)) return res.end("Unauthorized");
        return next();
    };    
}

module.exports = { checkForAuthentication, restrictTo }