const express = require("express");

const labTestController = require("../controllers/labTest-controller");

const router = express.Router();

router.post("/add", labTestController.addLabTest);
router.get("/getall/:id", labTestController.getLabTests);
router.delete("/delete/:id", labTestController.deleteLabTest);

module.exports = router;
