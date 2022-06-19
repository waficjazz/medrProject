const Patient = require("../models/patient");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Patient.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again later.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Email does not exist  could not log you in.", 401);
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Login Faild ,Wrong credentials try again", 500);
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError("Wrong password, could not log you in.", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser._id, email: existingUser.email, type: "patient" }, "JazzPriavteKey", { expiresIn: "9999 years" });
  } catch (err) {
    const error = new HttpError("Invalid credentials, could not log you in.", 401);
    return next(error);
  }
  res.status(201).json({
    userId: existingUser._id,
    email: existingUser.email,
    token: token,
  });
};

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
    password: hashedPassword,
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
    token = jwt.sign({ userId: createdUser.id, email: createdUser.email, type: "patient" }, "JazzPriavteKey", { expiresIn: "9999 years" });
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

const updatePatient = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const Token = authHeader && authHeader.split(" ")[1];
  console.log(Token);
  jwt.verify(Token, "JazzPriavteKey", (err, decodedToken) => {
    if (!err) {
      console.log(decodedToken);
    }

    if (err) {
      return next(new HttpError("Failed to authenticate token", 401));
    }
  });
  const {
    _id,
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
    permanentMeds,
    chronicDisease,
    healthProblems,
    allergies,
  } = req.body;

  try {
    reseponse = await Patient.updateOne({ _id: _id }, { permanentMeds, chronicDisease, healthProblems, allergies });
  } catch (err) {
    const error = new HttpError("could not update patient", 500);
    return next(error);
  }
  res.status(200).json("updated");
};

exports.updatePatient = updatePatient;
exports.patientInfo = patientInfo;
exports.signup = signup;
exports.signin = signin;
