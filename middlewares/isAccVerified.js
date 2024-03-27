const User = require("../model/User/User");



const checkAccVerification = async (req,res,next)=>{

    try{
        // find the user
        const user = await User.findById(req.userAuth._id);
        // check if the user is verified
        if(user?.isVerified){
            next();
        }else{
            res.status(401).json({message:"You need to verify your account first!"});
        }

    }catch(error){
        res.status(500).json({message: error.message})

    }
}

module.exports = checkAccVerification;