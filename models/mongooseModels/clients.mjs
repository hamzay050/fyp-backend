import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const clientsSchema = new Schema(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    contactNumber: { type: Number, default: null },
    nationalIdentityNumber: { type: Number, default: null },
    emergencyContactNo: { type: String, default: null },
    streetAddress: { type: String, default: null },
    streetAddress2: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: null },
    weight: { type: String, default: null },
    medicalLicenseNumber: { type: Number, default: null },
    zipCode: { type: Number, default: null },
    height: { type: Number, default: null },
    maritalStatus: { type: String, default: null },
    bloodGroup: { type: String, default: null },
    gender: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    isProfileCompleted: { type: Boolean, default: false },
    role: { type: String, default: "patient" },
    isMonday: { type: Boolean, default: false },
    isTuesday: { type: Boolean, default: false },
    isWednesday: { type: Boolean, default: false },
    isThursday: { type: Boolean, default: false },
    isFriday: { type: Boolean, default: false },
    isSaturday: { type: Boolean, default: false },
    isSunday: { type: Boolean, default: false },
    generalHealth:{type:String, default:null},
    chronicCondition:{type:String, default:null},
    surgery:{type:String, default:null},
    allergyReaction:{type:String, default:null},
    physicalActivity:{type:String, default:null},
    familyMedicalHistory:{type:String, default:null},
    isProfileCompleted: { type: Boolean, default: false },
    doctorAbout:{type:String, default:null},
    mondayStartTime: { type: Date },
    mondayEndTime: { type: Date },
    tuesdayStartTime: { type: Date },
    tuesdayEndTime: { type: Date },
    wednesdayStartTime: { type: Date },
    wednesdayEndTime: { type: Date },
    thursdayStartTime: { type: Date },
    thursdayEndTime: { type: Date },
    fridayStartTime: { type: Date },
    fridayEndTime: { type: Date },
    saturdayStartTime: { type: Date },
    saturdayEndTime: { type: Date },
    sundayStartTime: { type: Date },
    sundayEndTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

clientsSchema.plugin(mongooseDelete, { overrideMethods: true });

const Clients = mongoose.model("Clients", clientsSchema);

export default { Clients };
