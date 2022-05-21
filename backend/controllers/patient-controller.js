const Patient = require("../models/patient");
const HttpError = require("../models/http-error");

const signup = async (req, res, next) => {
  const { firstName, lastName, fatherName, motherName, birthDate, bloodGroup, email, address, city, region, password, phoneNumber, idType, idNumber, gender, weight, height } =
    req.body;
  const createdUser = new Patient({
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
    weight,
    height,
    createdAt: new Date(),
  });
  console;
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(createdUser);
};

const patientInfo = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Patient.findById($regex);
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching patient info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find items", 404));
  }

  res.json(info);
};

exports.patientInfo = patientInfo;
exports.signup = signup;
