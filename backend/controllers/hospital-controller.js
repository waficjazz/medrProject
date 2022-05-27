const Hospital = require("../models/hospital");
const HospitalVisit = require("../models/hospitalVisit");
const HttpError = require("../models/http-error");

const gethospitalVisits = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await HospitalVisit.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching hospital visits info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find hospital visits", 404));
  }

  res.json(info);
};

const addHospitalVisit = async (req, res, next) => {
  const { patientId, entryDate, timeSpent, cause, hospitalId, doctors, prescription } = req.body;
  const hospitalVisit = new HospitalVisit({
    patientId,
    entryDate,
    timeSpent,
    cause,
    doctors,
    hospitalId,
    prescription,
  });
  try {
    await hospitalVisit.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(hospitalVisit);
};

const addHospital = async (req, res, next) => {
  const { name, email, phoneNumber, address } = req.body;
  const hospital = new Hospital({
    name,
    email,
    phoneNumber,
    address,
  });
  try {
    await hospital.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(hospital);
};

const getHospitals = async (req, res, next) => {
  let info;

  try {
    info = await Hospital.find();
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching hospitals failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find hopitals ", 404));
  }

  res.json(info);
};

exports.gethospitalVisits = gethospitalVisits;
exports.getHospitals = getHospitals;
exports.addHospitalVisit = addHospitalVisit;
exports.addHospital = addHospital;
