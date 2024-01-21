import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema, Types } = mongoose;

const educationSchema = new Schema(
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

educationSchema.plugin(mongooseDelete, { overrideMethods: true });

const Education = mongoose.model("Education", educationSchema);

export default { Education };
