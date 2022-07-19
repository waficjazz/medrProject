const HospitalVisit = require("../models/hospitalVisit");
const ClinicalVisit = require("../models/clinicalVisit");
const Vacc = require("../models/vaccinations");
const HttpError = require("../models/http-error");
const Patient = require("../models/patient");
const Surg = require("../models/surgery");
const hospitalVisits = async (req, res, next) => {
  let gender = req.params.gender;
  let count = 0;
  try {
    Patient.aggregate([
      {
        $match: { gender: gender },
      },
      {
        $lookup: {
          from: HospitalVisit.collection.name,
          localField: "_id",
          foreignField: "patientId",
          as: "visit",
        },
      },
    ]).exec(function (err, patient) {
      patient.map((s) => {
        count += s.visit.length;
      });
      res.json({ count: count });
    });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
};

const vaccines = async (req, res, next) => {
  let gender = req.params.gender;
  let count = 0;
  try {
    Patient.aggregate([
      {
        $match: { gender: gender },
      },
      {
        $lookup: {
          from: Vacc.collection.name,
          localField: "_id",
          foreignField: "patientId",
          as: "visit",
        },
      },
    ]).exec(function (err, patient) {
      patient.map((s) => {
        count += s.visit.length;
      });
      res.json({ count: count });
    });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
};

const surgeries = async (req, res, next) => {
  let gender = req.params.gender;
  let count = 0;
  try {
    Patient.aggregate([
      {
        $match: { gender: gender },
      },
      {
        $lookup: {
          from: Surg.collection.name,
          localField: "_id",
          foreignField: "patientId",
          as: "visit",
        },
      },
    ]).exec(function (err, patient) {
      patient.map((s) => {
        count += s.visit.length;
      });
      res.json({ count: count });
    });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
};

const clinicalVisits = async (req, res, next) => {
  let gender = req.params.gender;
  let count = 0;
  try {
    Patient.aggregate([
      {
        $match: { gender: gender },
      },
      {
        $lookup: {
          from: ClinicalVisit.collection.name,
          localField: "_id",
          foreignField: "patientId",
          as: "visit",
        },
      },
    ]).exec(function (err, patient) {
      patient.map((s) => {
        count += s.visit.length;
      });
      res.json({ count: count });
    });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
};

const chronicDisease = async (req, res, next) => {
  let gender = req.params.gender;
  let count;
  try {
    count = await Patient.count({
      gender: gender,
      chronicDisease: { $exists: true, $not: { $size: 0 } },
    });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
  res.json({ count: count });
};

const allergies = async (req, res, next) => {
  let gender = req.params.gender;
  let count;
  try {
    count = await Patient.count({
      gender: gender,
      allergies: { $exists: true, $not: { $size: 0 } },
    });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
  res.json({ count: count });
};

const monthSurgeries = async (req, res, next) => {
  let month = req.params.month;

  let monthone;
  if (month < 10) {
    monthone = "0" + (parseInt(month) + 1).toString();
    month = "0" + month;
  } else {
    monthone = parseInt(month) + 1;
  }
  let a;
  console.log(month, monthone);
  try {
    a = await Surg.count({ date: { $gt: new Date(`2020-${month}-01`), $lt: new Date(`2022-${monthone}-03`) } });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
  res.json(a);
};

exports.allergies = allergies;
exports.chronicDisease = chronicDisease;
exports.clinicalVisits = clinicalVisits;
exports.vaccines = vaccines;
exports.hospitalVisits = hospitalVisits;
exports.surgeries = surgeries;
exports.monthSurgeries = monthSurgeries;
