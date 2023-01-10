import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    DoctorName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    patientName: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },
    Date: {
      type: String,
      trim: true,
      required: true,
    },
    Description: {
      type: String,
    },
  },
  { timestamps: true }
);

// Compile model from schema
export default mongoose.model("Appointment", appointmentSchema);
