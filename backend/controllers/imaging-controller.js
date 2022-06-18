const Imaging = require("../models/imaging");
const HttpError = require("../models/http-error");
const { s3Upload } = require("../s3Service");

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
  const { report, name, patientId, clinicalVisit, HopitalVisit, date, hospitalId, location, prescription } = req.body;
  const file = req.file;

  const imaging = new Imaging({
    name,
    report,
    patientId,
    clinicalVisit,
    HopitalVisit,
    date,
    location,
  });
  try {
    await imaging.save();
    const result = await s3Upload(file);
    console.log(result);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(imaging);
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

exports.getAll = getAll;
exports.deleteImaging = deleteImaging;
exports.addImaging = addImaging;
exports.getImaging = getImaging;
