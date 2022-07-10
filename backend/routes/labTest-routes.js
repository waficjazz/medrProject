const express = require("express");
const { auth } = require("../middleware/rbac");
const labTestController = require("../controllers/labTest-controller");

const router = express.Router();

router.get("/visit/:id/:vid", labTestController.getLabByVisit);
router.post("/add", auth, labTestController.addLabTest);
router.get("/getall/:id", labTestController.getLabTests);
router.delete("/delete/:id", auth, labTestController.deleteLabTest);

module.exports = router;
