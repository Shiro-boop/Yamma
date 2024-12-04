const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  registeredAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Log the request body
    console.log(req.body);

    // Check password length
    if (password.length < 8) {
      return res
        .status(400)
        .send("Password must be at least 8 characters long");
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    console.log("User saved to DB:", newUser); // Log the saved user
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error in registration:", error); // Log error
    res.status(500).send("Server error");
  }
});


// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("User not found");
    }

    // Compare entered password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }

    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
