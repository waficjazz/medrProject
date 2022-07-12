const Patient = require("../models/patient");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
    const error = new HttpError("Email does not exist could not log you in", 401);
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

  let user;

  try {
    user = await Patient.findOne({ email: email, validationCode: code });
  } catch (err) {
    const error = new HttpError("Verfication , failed  please try again later.", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Email does not exist  could not log you in.", 401);
    return next(error);
  }
  let emailVerified = true;
  let response;
  try {
    response = await Patient.updateOne({ _id: user._id }, { emailVerified });
  } catch (err) {
    const error = new HttpError("could not verify email id", 500);
    return next(error);
  }
  token = jwt.sign({ userId: user.id, email: user.email, type: "patient" }, "JazzPriavteKey", { expiresIn: "9999 years" });
  res.status(201).json({ user: user, token: token });
};
const signup = async (req, res, next) => {
  const { firstName, lastName, fatherName, motherName, birthDate, bloodGroup, email, address, city, region, password, phoneNumber, idType, idNumber, gender, weight, height } =
    req.body;
  let hashedPassword;
  let validationCode;
  let exist;
  try {
    exist = Patient.findOne({ email: email });

    if (exist != null) {
      const error = new HttpError("Email already exist please use different email or sign in ", 500);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("error signing up", 500);
    return next(error);
  }

  try {
    hashedPassword = await bcrypt.hash(password, 12);
    validationCode = makeid(5);
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
    validationCode,
  });

  try {
    await createdUser.save();
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
  res.status(201).json({ message: "email verification sent" });
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
    reseponse = await Patient.updateOne(
      { _id: _id },
      {
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
      }
    );
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
exports.verifyCode = verifyCode;
