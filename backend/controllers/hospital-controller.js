const Hospital = require("../models/hospital");
const verifiedHospital = require("../models/verifiedHospital");
const HospitalVisit = require("../models/hospitalVisit");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await verifiedHospital.findOne({ email: email });
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

const signup = async (req, res, next) => {
  const { email, hospitalName, phoneNumber, password, address, city, region } = req.body;
  let hashedPassword;
  console.log(password);
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create hospital please try again", 500);
    return next(error);
  }
  const createdHospital = new verifiedHospital({
    email,
    hospitalName,
    phoneNumber,
    password: hashedPassword,
    address,
    city,
    region,
  });
  console;
  try {
    await createdHospital.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  let token;
  try {
    token = jwt.sign({ userId: createdHospital.id, email: createdHospital.email, type: "doctor" }, "JazzPriavteKey", { expiresIn: "9999 years" });
  } catch (err) {
    const error = new HttpError("Signing up faild , please try again later", 500);
    return next(error);
  }
  res.status(201).json({ user: createdHospital, token: token });
};

const deleteHopitalVisit = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await HospitalVisit.deleteOne({ _id: $regex });
    console.log(info);
  } catch (err) {
    const error = new HttpError("Deleteing hospital visits info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const gethospitalVisits = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await HospitalVisit.find({ patientId: $regex });
    console.log(info);
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find hospital visits", 404));
    }

    const error = new HttpError("Fetching hospital visits info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const addHospitalVisit = async (req, res, next) => {
  const { patientId, entryDate, timeSpent, cause, hospitalId, doctors, prescription } = req.body;
  const hospitalVisit = new HospitalVisit({
    patientId,
    entryDate,
    timeSpent,
    cause,
    doctors,
    hospitalId,
    prescription,
  });
  try {
    await hospitalVisit.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(hospitalVisit);
};

const addHospital = async (req, res, next) => {
  const { name, email, phoneNumber, address } = req.body;
  const hospital = new Hospital({
    name,
    email,
    phoneNumber,
    address,
  });
  try {
    await hospital.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(201).json(hospital);
};

const getHospitals = async (req, res, next) => {
  let info;

  try {
    info = await Hospital.find();
    console.log(info);
  } catch (err) {
    const error = new HttpError("Fetching hospitals failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find hopitals ", 404));
  }

  res.json(info);
};

const getHospitalById = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Hospital.findById($regex);
  } catch (err) {
    const error = new HttpError("Fetching hospital visits info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find hospital visits", 404));
  }

  res.json(info);
};

exports.getHospitalById = getHospitalById;
exports.gethospitalVisits = gethospitalVisits;
exports.getHospitals = getHospitals;
exports.addHospitalVisit = addHospitalVisit;
exports.addHospital = addHospital;
exports.deleteHopitalVisit = deleteHopitalVisit;
exports.signup = signup;
exports.signin = signin;
