import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
const {Types,Schema} = mongoose;

const reportSchema= new Schema({
    patientId:{type:Types.ObjectId,default:null},
    doctorId:{type:Types.ObjectId,default:null},
    appointmentId:{type:Types.ObjectId,default:null},
    reportTitle:{type:String,default:null},
    reportDetails:{type:String,default:null},
    status:{type:String,default:'pending'}
},{timestamps:true})

reportSchema.plugin(mongooseDelete, { overrideMethods: true });
const Report= mongoose.model('Report',reportSchema)

export default {Report};