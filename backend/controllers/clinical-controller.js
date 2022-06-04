const ClinicalVisit = require("../models/clinicalVisit");
const HttpError = require("../models/http-error");

const deleteClinicalVisit = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await ClinicalVisit.deleteOne({ _id: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Deleteing clinical visits info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const getClinicalVisits = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await ClinicalVisit.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find clinical visits", 404));
    }

    const error = new HttpError("Fetching clinical visits info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const addClinicalVisit = async (req, res, next) => {
  const { patientId, email, phoneNumber, visitDate, description, cause, clinicAddress, doctorName } = req.body;
  const clinicalVisit = new ClinicalVisit({
    patientId,
    doctorName,
    email,
    phoneNumber,
    visitDate,
    description,
    cause,
    clinicAddress,
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
exports.deleteClinicalVisit = deleteClinicalVisit;
