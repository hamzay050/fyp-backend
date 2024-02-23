import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema, Types } = mongoose;

const timeSlotSchema = new Schema(
  {
    doctorId: { type: Types.ObjectId, default: null },
    day: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

timeSlotSchema.plugin(mongooseDelete, { overrideMethods: true });

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

export default { TimeSlot };
