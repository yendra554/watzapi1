const mongoose = require("mongoose")

mongoose.connect(
        process.env.DB_URL,
        {useNewUrlParser:true,useUnifiedTopology: true},
        err =>{
            if(err){
                throw err.message;
            }
            else{
                console.log("databse connection successfully !");
            }
        }
    )

    module.exports = mongoose;