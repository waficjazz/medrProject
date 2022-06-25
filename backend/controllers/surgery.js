const Vaccinations = require("../models/surgery");
const HttpError = require("../models/http-error");

const addSurgery = async (req, res, next) => {
  const { name, patientId, location, notes, date, shots } = req.body;
  const vacc = new Vaccinations({
    name,
    patientId,
    location,
    notes,
    date,
    shots,
  });
  try {
    await vacc.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(vacc);
};

const getSurgeries = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Vaccinations.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find  vaccinations", 404));
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
    info = await Vaccinations.deleteOne({ _id: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Deleteing vaccination   failed, please try again later", 500);
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
