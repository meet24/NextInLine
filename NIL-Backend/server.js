const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();

// Allow requests from localhost:8081
app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true  // If you need to send cookies or headers
}));

dotenv.config();

const connectDB = require("./config/db");
connectDB();

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
