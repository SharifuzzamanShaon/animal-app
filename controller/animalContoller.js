const Animal = require("../models/Animal.model");
const Category = require("../models/Category.model");
const fs = require("fs");
const { uploadOnCloudinary } = require("./../utils/uploadFiles");

const addAnimal = async (req, res, next) => {
  try {
    const { name, img, categoryId } = req.body; 

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const existingAnimal = await Animal.findOne({ name, categoryId });
    if (existingAnimal) {
      return res.status(400).json({
        message:
          "Animal with this name already exists in the selected category",
      });
    }

    const buffer = Buffer.from(img, "base64");
    fs.writeFileSync("outputfile", buffer);
    const response = await uploadOnCloudinary(img);
    const imageUrl = response.secure_url;

    const newAnimal = new Animal({ name, imageUrl, categoryId });
    await newAnimal.save();
     await Animal.findById(newAnimal._id).populate(
      "categoryId",
      "name"
    );
    res.status(201).json({
      success:true,
      message: "Animal created successfully"
    });
  } catch (error) {
    next(error);
  }
};
const getAllAnimal = async (req, res, next) => {
  try {
    const animals = await Animal.find();
    res.status(200).json({
      success: true,
      data: animals,
    });
  } catch (error) {
    next(error); 
  }
};
const findAnimalsByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    let categoryId;
    const categoryData = await Category.findOne({
      $or: [{ _id: category }, { name: category }],
    });
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }
    categoryId = categoryData._id;
    const animals = await Animal.find({ categoryId }).populate(
      "categoryId",
      "name"
    );
    res.status(200).json({
      message: "Animals retrieved successfully",
      animals,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addAnimal, getAllAnimal, findAnimalsByCategory };
