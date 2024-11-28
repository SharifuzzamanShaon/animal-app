const express = require("express");
const { addAnimal, findAnimalsByCategory } = require("../controller/animalContoller");
const router = express.Router();

router.get("/all-animal", )
router.post("/add-animal", addAnimal);
router.get("/get", findAnimalsByCategory)
module.exports = router;
