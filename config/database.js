const mongoose = require("mongoose");
// connect to db
const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://Nathuwwa:amamam&$N1@mern-v1-blog.6pmxm8d.mongodb.net/MERN-V1-Blog?retryWrites=true&w=majority')
        console.log("MongoDb Connected:")
    }
    catch(error){
        console.log('MongoDB connection failed',error.message)
    }
}

module.exports = connectDB