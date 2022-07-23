const Notifications = require("../models/notification");
const HttpError = require("../models/http-error");

const getNotifications = async (req, res, next) => {
  let info;
  const $regex = req.params.id;
  try {
    info = await Notifications.find({ patientId: $regex });
  } catch (err) {
    if (!info || info.length === 0) {
      return next(new HttpError("Could not find notifications ", 404));
    }

    const error = new HttpError("Fetching notfications  info failed, please try again later", 500);
    return next(error);
  }

  res.json(info);
};

const addNotification = async (req, res, next) => {
  const { action, patientId, issuerId, issuerType, item, issuer } = req.body;
  const ntf = new Notifications({
    action,
    patientId,
    issuerId,
    issuerType,
    item,
    issuer,
  });
  try {
    await ntf.save();
  } catch (err) {
    const error = new HttpError("Adding notifications failed, please try again later", 500);
    return next(error);
  }

  res.status(201).json(ntf);
};

exports.addNotification = addNotification;
exports.getNotifications = getNotifications;
