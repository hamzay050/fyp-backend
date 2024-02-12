import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema,Types } = mongoose;

const certificateSchema = new Schema(
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

certificateSchema.plugin(mongooseDelete, { overrideMethods: true });

const Certificate = mongoose.model("Certificate", certificateSchema);

export default { Certificate };
