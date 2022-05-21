const Patient = require("../models/patient");

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

exports.signup = signup;
