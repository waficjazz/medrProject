const express = require("express");

const analyticsController = require("../controllers/analytics-controller");
const router = express.Router();

router.get("/hospitalVisits/:gender", analyticsController.hospitalVisits);

router.get("/vaccines/:gender", analyticsController.vaccines);
router.get("/surgeries/:gender", analyticsController.surgeries);
router.get("/chronicDisease/:gender", analyticsController.chronicDisease);
router.get("/clinicalVisits/:gender", analyticsController.clinicalVisits);

module.exports = router;
