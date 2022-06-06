const Patient = require("../models/patient");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { firstName, lastName, fatherName, motherName, birthDate, bloodGroup, email, address, city, region, password, phoneNumber, idType, idNumber, gender, weight, height } =
    req.body;
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create patient please try again", 500);
    return next(error);
  }
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

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  let token;
  try {
    token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, "JazzPriavteKey", { expiresIn: "5h" });
  } catch (err) {
    const error = new HttpError("Signing up faild , please try again later", 500);
    return next(error);
  }
  res.status(201).json({ user: createdUser, token: token });
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
    return next(new HttpError("Could not find patient", 404));
  }

  res.json(info);
};

exports.patientInfo = patientInfo;
exports.signup = signup;
