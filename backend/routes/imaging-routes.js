const express = require("express");

const imagingController = require("../controllers/imaging-controller");

const router = express.Router();

router.post("/add", imagingController.addImaging);
router.get("/get/:id", imagingController.getImaging);
router.get("/all/:id", imagingController.getAll);
router.delete("/delete/:id", imagingController.deleteImaging);
module.exports = router;
