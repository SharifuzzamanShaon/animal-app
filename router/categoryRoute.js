const express = require("express");
const { addCategory, allCategory } = require("../controller/categoryController");
const router = express.Router();


router.get("/all-category", allCategory)
router.post("/add", addCategory);
module.exports = router;
