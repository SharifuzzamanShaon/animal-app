const mongoose = require('mongoose');

// Define the schema for Category
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure unique category names
    trim: true // Trim whitespace
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
