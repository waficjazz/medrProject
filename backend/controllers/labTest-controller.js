const LabTest = require("../models/labTest");
const HttpError = require("../models/http-error");
const { s3Upload } = require("../s3Service");
const mongoose = require("mongoose");
const getLabByVisit = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  const $regex2 = req.params.vid;
  try {
    console.log("fetching");
    info = await LabTest.find({ patientId: $regex, HospitalVisit: $regex2 });
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

// const addLabTest = async (req, res, next) => {
//   const { name, patientId, location, notes, date, csv, HospitalVisit } = req.body;
// const test = new LabTest({
//   name,
//   patientId,
//   location,
//   csv,
//   notes,
//   date,
//   HospitalVisit,
// });
//   try {
//     await test.save();
//   } catch (err) {
//     console.log(err);
//     return next(err);
//   }
//   console.log(test);
//   res.status(201).json(test);
// };

const addLabTest = async (req, res, next) => {
  let test;
  const { name, patientId, location, notes, date, HospitalVisit } = req.body;
  let hVisit = HospitalVisit;
  if (!mongoose.Types.ObjectId.isValid(HospitalVisit)) {
    hVisit = null;
  }
  let report;
  if (req.files["report"]) {
    report = req.files["report"][0];
  }
  try {
    if (req.files["report"]) {
      const resultReport = await s3Upload(report, ".pdf", "reports");
      reportURL = resultReport.Location;
    } else {
      reportURL = "";
    }
    test = new LabTest({
      name,
      patientId,
      location,
      csv: reportURL,
      notes,
      date,
      HospitalVisit: hVisit,
    });
    await test.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(test);
};

const getLabTests = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await LabTest.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching lab tests  info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find lab tests ", 404));
  }

  res.json(info);
};

const getOneLab = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await LabTest.findById($regex);
  } catch (err) {
    const error = new HttpError("Fetching lab test info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find lab test ", 404));
  }

  res.json(info);
};

const deleteLabTest = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await LabTest.deleteOne({ _id: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Deleteing lab test failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const updateLab = async (req, res, next) => {
  const { patientId, name, notes, date, location, csv, id } = req.body;

  try {
    reseponse = await LabTest.updateOne({ _id: id }, { patientId, name, notes, date, location, csv });
  } catch (err) {
    const error = new HttpError("could not update lab", 500);
    return next(error);
  }
  res.status(200).json("updated");
};
exports.getOneLab = getOneLab;
exports.deleteLabTest = deleteLabTest;
exports.getLabTests = getLabTests;
exports.addLabTest = addLabTest;
exports.getLabByVisit = getLabByVisit;
exports.updateLab = updateLab;
