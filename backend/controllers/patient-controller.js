const Patient = require("../models/patient");

const signup = async (req, res, next) => {
  const { firstName, lastName, fatherName, motherName, birthDate, bloodGroup, email, adddress, phoneNumber, region, city } = req.body;
  const createdUser = new Patient({
    firstName,
    lastName,
    fatherName,
    motherName,
    birthDate,
    bloodGroup,
    email,
    adddress,
    phoneNumber,
    createdAt: new Date(),
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json(createdUser);
};

exports.signup = signup;
