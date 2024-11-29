const Category = require("../models/Category.model");

const allCategory = async (req, res, next) => {
  try {
    const allCategory = await Category.find();
    res.status(200).send({ success: true, allCategory });
  } catch (error) {
    next(error);
  }
};
const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCategory,
  allCategory
};
