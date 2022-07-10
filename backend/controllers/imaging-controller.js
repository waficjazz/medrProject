const Imaging = require("../models/imaging");
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

const addImaging = async (req, res, next) => {
  const { name, patientId, clinicalVisit, HospitalVisit, date, hospitalId, location, prescription } = req.body;
  let hVisit = HospitalVisit;
  let cVisit = clinicalVisit;
  if (!mongoose.Types.ObjectId.isValid(HospitalVisit)) {
    hVisit = null;
  }
  if (!mongoose.Types.ObjectId.isValid(clinicalVisit)) {
    cVisit = null;
  }
  let image;
  let report;
  let reportURL;
  if (req.files["image"]) {
    image = req.files["image"][0];
  }
  if (req.files["report"]) {
    report = req.files["report"][0];
  }
  // console.log(req.files);
  let imagesArray = [];

  try {
    if (req.files["image"]) {
      const result = await s3Upload(image, ".png", "imgagings");
      imagesArray.push(result.Location);
    }
    if (req.files["report"]) {
      const resultReport = await s3Upload(report, ".pdf", "reports");
      reportURL = resultReport.Location;
    } else {
      reportURL = "";
    }
    const imaging = new Imaging({
      name,
      report: reportURL,
      patientId,
      clinicalVisit: cVisit,
      HospitalVisit: hVisit,
      date,
      location,
      images: imagesArray,
    });
    await imaging.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json({ message: "Imaging added successfully" });
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

exports.getImagingByVisit = getImagingByVisit;
exports.getAll = getAll;
exports.deleteImaging = deleteImaging;
exports.addImaging = addImaging;
exports.getImaging = getImaging;
