const Prescription = require("../models/prescriptions");
const HttpError = require("../models/http-error");
const { s3Upload } = require("../s3Service");
const mongoose = require("mongoose");
const getAll = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Imaging.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find  Imagings", 404));
    }
    const error = new HttpError("Fetching Imagingsinfo failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const addPrescription = async (req, res, next) => {
  const { labTests, patientId, date, description, hospitalVisit, clinicalVisit, location, issuer, medications } = req.body;
  const presc = new Prescription({
    patientId,
    date,
    labTests,
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

const getImaging = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Imaging.findById($regex);
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching imaging info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find imaging", 404));
  }

  res.json(info);
};

const deleteImaging = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Imaging.deleteOne({ _id: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Deleteing imaging failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const getImagingByVisit = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  const $regex2 = req.params.vid;
  try {
    console.log("fetching");
    info = await Imaging.find({ patientId: $regex, HospitalVisit: $regex2 });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching imaging info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find imaging", 404));
  }

  res.json(info);
};

exports.addPrescription = addPrescription;
