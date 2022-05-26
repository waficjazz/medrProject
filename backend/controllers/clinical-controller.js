const ClinicalVisit = require("../models/clinicalVisit");
const HttpError = require("../models/http-error");

const getClinicalVisits = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await ClinicalVisit.findById($regex);
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching clinical visits info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find clinical visits", 404));
  }

  res.json(info);
};

const addClinicalVisit = async (req, res, next) => {
  const { patientId, clinicAddress, visitDate, cause, doctorId, clinicName, description, prescription } = req.body;
  const clinicalVisit = new ClinicalVisit({
    patientId,
    clinicAddress,
    visitDate,
    cause,
    doctorId,
    clinicName,
    description,
    prescription,
  });
  try {
    await clinicalVisit.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(clinicalVisit);
};

exports.getClinicalVisits = getClinicalVisits;
exports.addClinicalVisit = addClinicalVisit;
