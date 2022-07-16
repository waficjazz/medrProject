const express = require("express");

const analyticsController = require("../controllers/analytics-controller");
const router = express.Router();

router.get("/hospitalVisitsMale", analyticsController.hospitalVisitsMale);
router.get("/hospitalVisitsFemale", analyticsController.hospitalVisitsFemale);

router.get("/vaccines/:gender", analyticsController.vaccines);

module.exports = router;
