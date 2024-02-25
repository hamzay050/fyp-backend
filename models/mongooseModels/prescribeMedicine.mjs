import mongoose from "mongoose"
import mongooseDelete from "mongoose-delete"

const {Schema,Types}= mongoose;

const prescribeMedicineSchema= new Schema({

    prescriptionReason:{type:String,default:null},
    medicineName:{type:String,default:null},
    amount:{type:String,default:null},
    frequency:{type:String,default:null},
    startDate:{type:Date,default:null},
    endDate:{type:Date,default:null},
    administration:{type:String,default:null},
    specialInstruction:{type:String,default:null},
    recommendedTest:{type:String,default:null},
    appointmentId:{type:Types.ObjectId,required:true}

},{timestamps:true})

prescribeMedicineSchema.plugin(mongooseDelete,{overrideMethods:true})

const MedicinePrescribed= mongoose.model("MedicinePrescribed",prescribeMedicineSchema)

export default {MedicinePrescribed};