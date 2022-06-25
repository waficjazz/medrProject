const Surgery = require("../models/surgery");
const HttpError = require("../models/http-error");

const getSurgeriesByVisit = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  const $regex2 = req.params.vid;
  try {
    info = await Surgery.find({ patientId: $regex, HospitalVisit: $regex2 });
  } catch (err) {
    const error = new HttpError("Fetching imaging info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find imaging", 404));
  }

  res.json(info);
};

const addSurgery = async (req, res, next) => {
  const { patientId, date, name, cause, description, HospitalVisit, verifiedHospital, hospitalId } = req.body;
  const surg = new Surgery({
    patientId,
    date,
    name,
    cause,
    description,
    HospitalVisit,
    verifiedHospital,
    hospitalId,
  });
  try {
    await surg.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(surg);
};

const getSurgeries = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Surgery.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find  surgeries", 404));
    }
    const error = new HttpError("Fetching vaccinations info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const deleteSurgery = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Surgery.deleteOne({ _id: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Deleteing surgery   failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const getOneSurgery = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Vaccinations.find({ _id: $regex });
    console.log(info);
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find  vaccination", 404));
    }
    const error = new HttpError("Fetching vaccinations info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const updateSurgery = async (req, res, next) => {
  const { name, patientId, location, notes, date, shots, id } = req.body;

  try {
    reseponse = await Vaccinations.updateOne({ _id: id }, { name, patientId, location, notes, date, shots });
  } catch (err) {
    const error = new HttpError("could not update vaccination", 500);
    return next(error);
  }
  res.status(200).json("updated");
};

exports.getOneSurgery = getOneSurgery;
exports.updateSurgery = updateSurgery;
exports.deleteSurgery = deleteSurgery;
exports.getSurgeries = getSurgeries;
exports.addSurgery = addSurgery;
exports.getSurgeriesByVisit = getSurgeriesByVisit;
