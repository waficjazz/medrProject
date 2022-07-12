const Prescription = require("../models/prescriptions");
const HttpError = require("../models/http-error");
const { s3Upload } = require("../s3Service");
const mongoose = require("mongoose");

const addPrescription = async (req, res, next) => {
  const { labs, patientId, date, description, hospitalVisit, clinicalVisit, location, issuer, medications } = req.body;
  const presc = new Prescription({
    patientId,
    date,
    labs,
    description,
    hospitalVisit,
    clinicalVisit,
    location,
    issuer,
    medications,
  });
  try {
    await presc.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(presc);
};

const getPrescriptions = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Prescription.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching Prescriptions info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find prescriptions", 404));
  }

  res.json(info);
};

const getOne = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Prescription.findById($regex);
  } catch (err) {
    const error = new HttpError("Fetching Prescription  failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find prescription", 404));
  }

  res.json(info);
};

const deletePrescription = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Prescription.deleteOne({ _id: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Deleteing imaging failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const updatePrescription = async (req, res, next) => {
  const { hospitalVisit, clinicalVisit, patientId, medications, labs, description, date, location, id, issuer } = req.body;

  try {
    reseponse = await Prescription.updateOne({ _id: id }, { patientId, medications, labs, issuer, description, date, location, hospitalVisit, clinicalVisit });
  } catch (err) {
    const error = new HttpError("could not update prescription", 500);
    return next(error);
  }
  res.status(200).json("updated");
};

exports.updatePrescription = updatePrescription;
exports.addPrescription = addPrescription;
exports.getPrescriptions = getPrescriptions;
exports.deletePrescription = deletePrescription;
exports.getOne = getOne;
