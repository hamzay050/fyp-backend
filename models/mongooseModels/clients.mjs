import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const { Schema } = mongoose;

const clientsSchema = new Schema(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    contactNo: { type: String, default: null },
    emergencyContactNo: { type: String, default: null },
    streetAddress: { type: String, default: null },
    houseNo: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipCode: { type: Number, default: null },
    height: { type: Number, default: null },
    maritalStatus: { type: String, default: null },
    bloodGroup: { type: String, default: null },
    sex: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

clientsSchema.plugin(mongooseDelete, { overrideMethods: true });

const Clients = mongoose.model("Clients", clientsSchema);

export default { Clients };
