const Doctor = require("../models/doctor");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create doctor please try again", 500);
    return next(error);
  }
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
    password: hashedPassword,
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
  let token;
  try {
    token = jwt.sign({ userId: createdDoctor.id, email: createdDoctor.email, type: "doctor" }, "JazzPriavteKey", { expiresIn: "9999 years" });
  } catch (err) {
    const error = new HttpError("Signing up faild , please try again later", 500);
    return next(error);
  }
  res.status(201).json({ user: createdDoctor, token: token });
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Doctor.findOne({ email: email });
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
    token = jwt.sign({ userId: existingUser._id, email: existingUser.email, type: "doctor" }, "JazzPriavteKey", { expiresIn: "9999 years" });
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

exports.signin = signin;
exports.signup = signup;
