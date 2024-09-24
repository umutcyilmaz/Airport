const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const flightRoutes = require("./routes/flightRoutes"); // flightRoutes'ı dahil ediyoruz

const app = express();
const PORT = process.env.PORT || 5000;

// CORS'u etkinleştir
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB'ye bağlanma
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Uçuş rotalarını uygulamaya ekleme
app.use("/api/flights", flightRoutes);

// Sunucuyu başlatma
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
