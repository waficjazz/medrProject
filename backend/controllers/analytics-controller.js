const HospitalVisit = require("../models/hospitalVisit");
const HttpError = require("../models/http-error");
const Patient = require("../models/patient");
const test = async (req, res, next) => {
  let count = 0;
  Patient.aggregate([
    {
      $match: { gender: "Femal" },
    },
    {
      $lookup: {
        from: HospitalVisit.collection.name,
        localField: "_id",
        foreignField: "patientId",
        as: "visit",
      },
    },
  ]).exec(function (err, students) {
    students.map((s) => {
      count += s.visit.length;
      console.log(count);
      res.json(count);
    });
  });
};

exports.test = test;
