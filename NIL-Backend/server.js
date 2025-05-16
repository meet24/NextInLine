const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", require("./routes/userRoute"));
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET, // Ideally use env var
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", require("./routes/authRoute"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
