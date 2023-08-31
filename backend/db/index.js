const mongoose = require("mongoose");
// Define mongoose schemas
const GymSchema = new mongoose.Schema({
    name: {type: String, required: true},
    mobNumber:{type:Number,required:true},
    pincode:{type:Number,required:true},
    // dateOfJoining:{type:Date,required:true},
    gymName:{type:String, required:true},
    monthlyFee:{type:Number,required:true},
});
const CxSchema = new mongoose.Schema({
  cx_Name: {type: String, required: true},
  cx_MobNumber:{type:Number, required:true},
//   dateOfJoining:{type:Date,required:true},
  gym_id:{type: mongoose.Schema.Types.ObjectId, ref: "gyms",required:true},
  attendance:{type: mongoose.Schema.Types.ObjectId, ref: 'attendance'},
});
const AttendanceSchema = new mongoose.Schema({
 cx_id: {type: mongoose.Schema.Types.ObjectId, ref: 'cx',required:true},
 gym_id: {type: mongoose.Schema.Types.ObjectId, ref: 'gyms',required:true},
 present: {type: Number,default:0},
 absent: {type: Number,default:0},
});

const PasswdSchema = new mongoose.Schema({
 cx_id: {type: mongoose.Schema.Types.ObjectId, ref: 'cx',required:true},
 password:{type:String,required:true},
});

const FeesSubmittedSchema = new mongoose.Schema({
gym_id: {type: mongoose.Schema.Types.ObjectId, ref: 'gyms',required:true},
 cx_id: {type: mongoose.Schema.Types.ObjectId, ref: 'cx',required:true},
 last_fees_submit_details:{type:Number},
});

const otpSchema = new mongoose.Schema({
    cx_id: {type: mongoose.Schema.Types.ObjectId, ref: 'cx',required:true},
 otp:{type:Number,required:true},
});

// Define mongoose models
const Gym = mongoose.model("gym", GymSchema);
const Cx = mongoose.model("cx", CxSchema);
const Attendance = mongoose.model("attendance", AttendanceSchema);
const Passwd = mongoose.model("passwd", PasswdSchema);
const FeesSubmitted = mongoose.model("feesSubmitted", FeesSubmittedSchema);
const Otp = mongoose.model("otp", otpSchema);

// Export mongoose models
module.exports = {
    Gym,
    Cx,
    Attendance,
    Passwd,
    FeesSubmitted,
    Otp
};