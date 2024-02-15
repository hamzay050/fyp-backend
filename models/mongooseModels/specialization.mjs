import mongoose from "mongoose"
import mongooseDelete from "mongoose-delete";

const { Schema, Types } = mongoose;

const specializationSchema = new Schema(
    {
      clientId: { type: Types.ObjectId, default: null },
      title: { type: String, default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      institute: { type: String, default: null },
    },
    {
      timestamps: true,
    }
  );
  
  specializationSchema.plugin(mongooseDelete, { overrideMethods: true });
  
  const Specialization = mongoose.model("Specialization", specializationSchema);
  
  export default { Specialization };