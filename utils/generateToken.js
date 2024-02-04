const jwt = require("jsonwebtoken");

const generateToken = (user) =>{
    // create payload for the user

    const payload = {
        user:{
            id: user.id,
            
        }
    }

    //  sign the token with a secret key and expiration date
    const token =jwt.sign(payload,"ankey",{expiresIn:36000});// expires after an hour
    return token;
}

module.exports = generateToken;