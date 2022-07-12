const express = require("express");
const { auth } = require("../middleware/rbac");
const labTestController = require("../controllers/labTest-controller");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/one/:id", labTestController.getOneLab);
router.get("/visit/:id/:vid", labTestController.getLabByVisit);
router.post("/add", auth, fileUpload.fields([{ name: "report" }]), labTestController.addLabTest);
router.post("/update", auth, labTestController.updateLab);

router.get("/getall/:id", labTestController.getLabTests);
router.delete("/delete/:id", auth, labTestController.deleteLabTest);

module.exports = router;
