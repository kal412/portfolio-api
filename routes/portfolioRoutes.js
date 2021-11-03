const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");

router.get("/index", portfolioController.homepage);
router.patch("/update-service/:id", portfolioController.updateService);
router.patch("/update-landing/:id", portfolioController.updateLanding);
router.patch("/update-about/:id", portfolioController.updateAboutUs);
router.get("/contact-us", portfolioController.getContactUs);
router.delete("/contact-us/:id", portfolioController.deleteContactUs);
router.post("/contact-us", portfolioController.ContactUs);

module.exports = router;
