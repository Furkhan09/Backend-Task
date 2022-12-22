const mongoose = require('mongoose')

const MeetSchema = new mongoose.Schema({
    name : {type:String, required:[true, 'must provide name'],trim:true},
    email : {type:String, required:[true, 'must provide password'], trim : true},
    password :{type:String, required: true, trim : true},
    date : {type : Date, required : true,default:Date.now()},
    slot : {type: String, enum:['1pm-2pm','4pm-5pm','6pm-7pm']},
    option : {type : String, enum : ['confirm','pending'],default : 'pending'}
})

const MeetModel = mongoose.model('Meet', MeetSchema)
module.exports = MeetModel