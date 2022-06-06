const Doctor = require("../models/doctor");
const HttpError = require("../models/http-error");

const signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    fatherName,
    motherName,
    birthDate,
    bloodGroup,
    email,
    address,
    city,
    region,
    password,
    phoneNumber,
    idType,
    idNumber,
    gender,
    listOfHospitals,
    proficiency,
  } = req.body;
  const createdDoctor = new Doctor({
    firstName,
    lastName,
    fatherName,
    motherName,
    birthDate,
    bloodGroup,
    email,
    address,
    city,
    region,
    password,
    phoneNumber,
    idType,
    idNumber,
    gender,
    proficiency,
    hospitals: listOfHospitals,
    createdAt: new Date(),
  });
  console;
  try {
    await createdDoctor.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(createdDoctor);
};

exports.signup = signup;
