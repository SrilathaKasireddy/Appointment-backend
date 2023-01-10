import express from "express";
import { check } from "express-validator";
// import Auth from "../Middleware/auth.js";
var router = express.Router();

import {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
} from "../controllers/appointment.js";

router.param("id", getAppointmentById);

router.get("/apt", getAllAppointments);
router.post(
  "/saveApt",
  check("DoctorName")
    .exists()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name should be at least 3 char"),
  check("patientName").exists().notEmpty().withMessage("patient name should be given"),
  check("Date")
    .exists()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Appointment Date is not selected"),
  addAppointment
);
router.delete("/delete/:id",deleteAppointment);

export default router;
