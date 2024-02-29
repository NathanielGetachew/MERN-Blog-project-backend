const mongoose = require("mongoose");
// connect to db
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.mongoURL)
        console.log("MongoDb Connected:")
    }
    catch(error){
        console.log('MongoDB connection failed',error.message)
    }
}

module.exports = connectDB