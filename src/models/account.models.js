const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
    },
    status:{
        type: String,
        enum:{ 
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can only be ACTIVE, FROZEN, or CLOSED.",
            default: "ACTIVE"
        }
    },
    currency:{
        type: String,
        required: [true, "Currency is required"],
        default: "INR"
    }

},{timestamps:true})

accountSchema.index({user: 1, status:1 }) //compound index
const accountModel = mongoose.model("account", accountSchema);
module.exports = accountModel;
