
const path = require ("path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("MongoDB підключено"))
  .catch((err) => console.error("Помилка підключення до MongoDB", err));

// Схема користувача
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  registeredAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// Обробка POST-запиту для реєстрації
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({ username, password, email});
    await newUser.save();
    res.status(201).send("Користувача створено");
  } catch (error) {
    res.status(500).send("Помилка сервера");
  }
});

app.listen(process.env.PORT, () => console.log(`Сервер запущено на порту ${process.env.PORT}`));
