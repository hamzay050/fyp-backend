import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema, Types } = mongoose;

const patientMedicineSchema = new Schema(
  {
    clientId: { type: Types.ObjectId, default: null },
    medicineName:{type:String, default:null},
    dosage:{type:String,default:null},
    startDate:{type:Date,default:null}
  },
  {
    timestamps: true,
  }
);

patientMedicineSchema.plugin(mongooseDelete, { overrideMethods: true });

const Medicine = mongoose.model("Medicine", patientMedicineSchema);

export default { Medicine };
