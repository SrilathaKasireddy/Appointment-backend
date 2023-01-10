import Appointment from "../models/appointment.js";
import { validationResult } from "express-validator";

export async function getAppointmentById(req, res, next, id) {
  await Appointment.findById(id).exec((err, aptmnt) => {
    if (err) {
      return res.status(400).json({
        error: "Product not found",
        msg: err,
      });
    }
    req.aptmnt = aptmnt;
    next();
  });
}

export async function getAllAppointments(req, res) {
  await Appointment.find().exec((err, appointment) => {
    if (err || !appointment) {
      return res.status(400).json({
        status: "failed",
        error: "failed to get all appointments.",
        msg: err,
      });
    }
    res.apt = appointment;
    res.apt.forEach((element) => {
      element.__v = undefined;
    });
    // console.log(res.apt);
    // res.send(res.apt);
    res.send(res.apt);
  });
}

export function addAppointment(req, res) {
  const errors = validationResult(req).array();
  if (!!errors.length) {
    return res.status(422).json({
      status: "failed",
      error: true,
      msg: errors[0].msg,
      param: errors[0].param,
      location: errors[0].location,
    });
  }
  const appointment = new Appointment(req.body);
  appointment.save((err, appointment) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        error: "NOT able to save Appointment in DB",
        message: err,
      });
    }
    res.json({
      msg: "successfully saved appointment",
      data: [
        {
          id: appointment._id,
          DoctorName: appointment.DoctorName,
          patientName: appointment.patientName,
          Date: appointment.Date,
          Description: appointment.Description,
        },
      ],
    });
  });
}

export function deleteAppointment(req, res) {
  let appointment = req.aptmnt;
  console.log(appointment);
  appointment.remove((err, delAptmnt) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        error: "Failed to delete the appointment",
        msg: err,
      });
    }
    res.json({
      msg: "Deleted successfully",
    });
  });
}
