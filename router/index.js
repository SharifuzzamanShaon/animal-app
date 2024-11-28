const express = require("express");
const router = express.Router();
const categoryRoute = require("./categoryRoute");
const animalRoute = require("./animalRoute");

router.use("/category", categoryRoute);
router.use("/animal", animalRoute);

module.exports = router;
