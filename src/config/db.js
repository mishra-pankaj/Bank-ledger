const mongoose = require("mongoose")
async function connectdb(){
    try{
        await mongoose.connect(process.env.MongoDB_URI)
        console.log("Database connected!")
    }
    catch(err){
    console.log("DB Connection fail",err);
    process.exit(1);
    
}
}
module.exports = connectdb  ;