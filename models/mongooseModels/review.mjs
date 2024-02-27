import mongoose from "mongoose"
import mongooseDelete from "mongoose-delete";

const {Types,Schema} = mongoose;

const reviewSchema= new Schema({
    patientId:{type:Types.ObjectId,default:null},
    doctorId:{type:Types.ObjectId,default:null},
    appointmentId:{type:Types.ObjectId,default:null},
    patientName:{type:String,default:null},
    review:{type:String,default:null},
    reviewRating:{type:Number,default:null},
    status:{type:String,default:'pending'}
},{timestamps:true})

reviewSchema.plugin(mongooseDelete, { overrideMethods: true });

const Review= mongoose.model('Review',reviewSchema)

export default {Review}
