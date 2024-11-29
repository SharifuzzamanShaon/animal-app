const express = require("express");
const { addAnimal, findAnimalsByCategory, getAllAnimal } = require("../controller/animalContoller");
const router = express.Router();

router.get("/all-animal", )
router.post("/add-animal", addAnimal);
router.get("/all-animals", getAllAnimal)
router.get("/get", findAnimalsByCategory)
module.exports = router;
