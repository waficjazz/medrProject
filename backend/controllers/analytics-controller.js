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

// const chronicDisease = async (req, res, next) => {
//   let gender = req.params.gender;
//   let count = 0;
//   try {
//     Patient.match([
//       {
//         $match: { gender: gender },
//       },
//       {
//         $lookup: {
//           from: ClinicalVisit.collection.name,
//           localField: "_id",
//           foreignField: "patientId",
//           as: "visit",
//         },
//       },
//     ]).exec(function (err, patient) {
//       patient.map((s) => {
//         count += s.visit.length;
//       });
//       res.json({ count: count });
//     });
//   } catch (err) {
//     const error = new HttpError("Countin visits  failed, please try again later", 500);
//     return next(error);
//   }
// };

exports.clinicalVisits = clinicalVisits;
exports.vaccines = vaccines;
exports.hospitalVisits = hospitalVisits;
exports.surgeries = surgeries;
