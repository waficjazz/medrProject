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

const months = async (req, res, next) => {
  let year = req.params.year;
  let type = req.params.type;

  let month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let ress = {};
  let a;
  let m;
  if (type === "surgery") {
    m = Surg;
  }
  if (type === "hospitalVisit") {
    m = HospitalVisit;
  }

  try {
    await Promise.all(
      arr.map(async (s, i) => {
        if (i < arr.length - 1) {
          a = await m.count({ date: { $gt: new Date(`${year}-${s}-01`), $lt: new Date(`${year}-${arr[i + 1]}-01`) } });
          ress[month[i]] = a;
        } else {
          a = await m.count({ date: { $gt: new Date(`${year}-12-01`) } });
          ress[month[i]] = a;
        }
      })
    );
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
  res.json(ress);
};

exports.allergies = allergies;
exports.chronicDisease = chronicDisease;
exports.clinicalVisits = clinicalVisits;
exports.vaccines = vaccines;
exports.hospitalVisits = hospitalVisits;
exports.surgeries = surgeries;
exports.months = months;
