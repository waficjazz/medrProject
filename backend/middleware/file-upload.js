const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.memoryStorage(),
  //   storage: multer.diskStorage({
  //     destination: (req, file, cb) => {
  //       cb(null, "uploads/images");
  //     },
  // filename: (req, file, cb) => {
  //   const ext = MIME_TYPE_MAP[file.mimetype];
  //   cb(null, Date.now() + "." + ext);
  // },
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
