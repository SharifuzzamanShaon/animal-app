const { default: mongoose } = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CONNECTION_STR}`);
    console.log("Db connected");
  } catch (error) {
    console.log("Db connecton error", error);
  }
};
