const express = require("express");
const { auth } = require("../middleware/rbac");

const imagingController = require("../controllers/imaging-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.post("/add", auth, fileUpload.fields([{ name: "image" }, { name: "report" }]), imagingController.addImaging);
router.get("/get/:id", imagingController.getImaging);
router.get("/all/:id", imagingController.getAll);
router.get("/visit/:id/:vid", imagingController.getImagingByVisit);
router.delete("/delete/:id", auth, imagingController.deleteImaging);
module.exports = router;
