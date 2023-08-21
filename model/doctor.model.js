const mongoose = require("mongoose")

const appointmentsSchema = mongoose.Schema({
    name:{type:String},
    imageURL:{type:String},
    specialization :{
        type:String,
        enum:["Cardiologist","Dermatologist","Pediatrician","Psychiatrist"]
    },
    experience:{type:String},
    location:{type:String},
    date:{
        type:Date,
        default:Date.now
    },
    slots:{type:Number},
    fee:{type:Number},
    creatorName: {type:String},
    creatorId : {type:mongoose.Schema.Types.ObjectId,ref:"users"}

},{
    versionKey:false
})

const appointmentsModel = mongoose.model("appointment",appointmentsSchema)
module.exports = {
    appointmentsModel
}