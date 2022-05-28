const Imaging = require("../models/imaging");
const HttpError = require("../models/http-error");

const addImaging = async (req, res, next) => {
  const { images, report, name, patientId, clinicalVisit, HopitalVisit, date, hospitalId, location, prescription } = req.body;
  const imaging = new Imaging({
    name,
    images,
    report,
    patientId,
    clinicalVisit,
    HopitalVisit,
    date,
    location,
  });
  try {
    await imaging.save();
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

exports.addImaging = addImaging;
exports.getImaging = getImaging;
