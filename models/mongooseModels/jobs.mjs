import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const jobsSchema = new Schema(
  {
    title: { type: String, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    institute: { type: String, default: null },
    role: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

jobsSchema.plugin(mongooseDelete, { overrideMethods: true });

const Jobs = mongoose.model("Jobs", jobsSchema);

export default { Jobs };
