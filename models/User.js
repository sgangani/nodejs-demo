const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fullName: {type: String, require:true},
        enrollment:{type:String, require:true, unique:true},
        email: {type:String, require:true, unique:true},
        sem:{type:String, require: true},
        branch:{type:String, require: true},
        password:{type:String, require:true},
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", UserSchema);