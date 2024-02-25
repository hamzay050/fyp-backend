import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema, Types } = mongoose;

const appointmentSchema = new Schema(
  {
    doctorId: { type: Types.ObjectId, default: null },
    patientId: { type: Types.ObjectId, default: null },
    slotId: { type: Types.ObjectId, default: null },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.plugin(mongooseDelete, { overrideMethods: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default { Appointment };
