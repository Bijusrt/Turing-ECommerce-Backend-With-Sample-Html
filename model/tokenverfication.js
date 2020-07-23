const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

    let decodedToken = jwt.verify(req.headers.authorization,'tokenvalidator');

    req.decodedToken = decodedToken;
    
    next()
}