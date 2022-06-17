const Vaccinations = require("../models/vaccinations");
const HttpError = require("../models/http-error");

const addVaccination = async (req, res, next) => {
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

const getVaccinations = async (req, res, next) => {
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

const deleteVaccination = async (req, res, next) => {
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

exports.addVaccination = addVaccination;
exports.getVaccinations = getVaccinations;
exports.deleteVaccination = deleteVaccination;
