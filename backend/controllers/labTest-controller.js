const LabTest = require("../models/labTest");
const HttpError = require("../models/http-error");

const addLabTest = async (req, res, next) => {
  const { name, patientId, location, notes, date, csv } = req.body;
  const test = new LabTest({
    name,
    patientId,
    location,
    csv,
    notes,
    date,
  });
  try {
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

exports.deleteLabTest = deleteLabTest;
exports.getLabTests = getLabTests;
exports.addLabTest = addLabTest;
