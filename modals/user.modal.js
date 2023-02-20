const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imgmsg:{
        type: String
    },
    msg:{
        type: String
    },
    key:{
        type: String
    },
    number:{
        type: Number
    }
},
{ collection: 'users' })

userSchema.plugin(timestamp, {
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = mongoose.model("users",userSchema);
