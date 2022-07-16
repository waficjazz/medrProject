const HospitalVisit = require("../models/hospitalVisit");
const Vacc = require("../models/vaccinations");
const HttpError = require("../models/http-error");
const Patient = require("../models/patient");
const hospitalVisitsFemale = async (req, res, next) => {
  let countFemale = 0;

  try {
    Patient.aggregate([
      {
        $match: { gender: "Female" },
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
        countFemale += s.visit.length;
      });
      res.json({ countFemale: countFemale });
    });
  } catch (err) {
    const error = new HttpError("Countin visits  failed, please try again later", 500);
    return next(error);
  }
};
const hospitalVisitsMale = async (req, res, next) => {
  let countMale = 0;
  try {
    Patient.aggregate([
      {
        $match: { gender: "Male" },
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
        countMale += s.visit.length;
      });
      res.json({ countMale: countMale });
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

exports.vaccines = vaccines;
exports.hospitalVisitsFemale = hospitalVisitsFemale;
exports.hospitalVisitsMale = hospitalVisitsMale;
