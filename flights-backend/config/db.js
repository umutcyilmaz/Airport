const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Bağlantı başarısız olursa uygulamayı durdur
  }
};

module.exports = connectDB;
