const Hospital = require("../models/hospital");
const verifiedHospital = require("../models/verifiedHospital");
const HospitalVisit = require("../models/hospitalVisit");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const verifyCode = async (req, res, next) => {
  const { email, code } = req.body;

  let hospital;

  try {
    hospital = await verifiedHospital.findOne({ email: email, validationCode: code });
  } catch (err) {
    const error = new HttpError("Verfication , failed  please try again later.", 500);
    return next(error);
  }
  if (!hospital) {
    const error = new HttpError("Email does not exist  could not log you in.", 401);
    return next(error);
  }
  let emailVerified = true;
  let response;
  try {
    response = await hospital.updateOne({ _id: hospital._id }, { emailVerified });
  } catch (err) {
    const error = new HttpError("could not verify email id", 500);
    return next(error);
  }
  token = jwt.sign({ userId: hospital.id, email: hospital.email, type: "doctor" }, "JazzPriavteKey", { expiresIn: "9999 years" });
  res.status(201).json({ user: hospital, token: token });
};

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
  let validationCode;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
    validationCode = makeid(5);
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
    validationCode,
  });

  try {
    await createdHospital.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  let token;
  try {
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "jazzarwafic@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "jazzarwafic@gmail.com",
      to: email,
      subject: "medpfe verfication code",
      text: "You Verfication Code is: " + validationCode,
    };

    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
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
  const { verifiedHospital, patientId, entryDate, timeSpent, cause, hospitalId, doctors, prescription, description } = req.body;
  const hospitalVisit = new HospitalVisit({
    verifiedHospital,
    patientId,
    entryDate,
    timeSpent,
    cause,
    doctors,
    hospitalId,
    prescription,
    description,
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
  const { hospitalName, email, phoneNumber, address } = req.body;
  const hospital = new Hospital({
    hospitalName,
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

const getVerfiedHospitals = async (req, res, next) => {
  let info;

  try {
    info = await verifiedHospital.find();
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
    const error = new HttpError("Fetching hospital  info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find hospital visits", 404));
  }

  res.json(info);
};

const getVerifiedHospitalById = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await verifiedHospital.findById($regex);
  } catch (err) {
    const error = new HttpError("Fetching hospital visits info failed, please try again later", 500);
    return next(error);
  }

  if (!info || info.length === 0) {
    return next(new HttpError("Could not find hospital visits", 404));
  }

  res.json(info);
};

const getOneVisit = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await HospitalVisit.find({ _id: $regex });
    console.log(info);
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find  vaccination", 404));
    }
    const error = new HttpError("Fetching vaccinations info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const updateVisit = async (req, res, next) => {
  const { verifiedHospital, patientId, entryDate, timeSpent, cause, hospitalId, doctors, prescription, description, id } = req.body;
  console.log(req.body);
  try {
    await HospitalVisit.updateOne({ _id: id }, { verifiedHospital, patientId, entryDate, timeSpent, cause, hospitalId, doctors, prescription, description });
  } catch (err) {
    const error = new HttpError("could not update vaccination", 500);
    return next(error);
  }
  res.status(200).json("updated");
};

const updateHospital = async (req, res, next) => {
  const { hospitalName, email, phoneNumber, address, id } = req.body;
  try {
    await Hospital.updateOne({ _id: id }, { hospitalName, email, phoneNumber, address });
  } catch (err) {
    const error = new HttpError("could not update hospital", 500);
    return next(error);
  }
  res.status(200).json("updated");
};

exports.getVerifiedHospitalById = getVerifiedHospitalById;
exports.getHospitalById = getHospitalById;
exports.gethospitalVisits = gethospitalVisits;
exports.getHospitals = getHospitals;
exports.getVerfiedHospitals = getVerfiedHospitals;
exports.addHospitalVisit = addHospitalVisit;
exports.addHospital = addHospital;
exports.deleteHopitalVisit = deleteHopitalVisit;
exports.signup = signup;
exports.signin = signin;
exports.verifyCode = verifyCode;
exports.getOneVisit = getOneVisit;
exports.updateVisit = updateVisit;
exports.updateHospital = updateHospital;
