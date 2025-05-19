const session = require("express-session");
const passport = require("passport");
const { generateAndStoreOtp, verifyOtp } = require('./utils/otpStore');
const { sendEmailOTP } = require("./utils/mailer");


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
app.use("/api", require("./routes/userRoute"));



// OTP email verification
app.post('/api/verify/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: 'Email required' });

   const otp = await generateAndStoreOtp(email);
  await sendEmailOTP(email, otp);

  res.json({ msg: 'OTP sent to your email' });
});

app.post('/api/verify/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const valid = await verifyOtp(email, otp);

  if (valid) {
    res.json({ msg: 'Email verified successfully' });
  } else {
    res.status(400).json({ msg: 'Invalid or expired OTP' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
