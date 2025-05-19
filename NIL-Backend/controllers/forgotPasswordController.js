const User = require("../models/user");
const Otp = require("../models/otp");
const { sendEmailOTP } = require("../utils/mailer");
const bcrypt = require("bcryptjs");

// 1️⃣ Send OTP to email for reset
exports.sendResetOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(otp, salt);

  await Otp.findOneAndUpdate(
    { email },
    {
      otpHash,
      verified: false,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
    { upsert: true, new: true }
  );

  await sendEmailOTP(email, otp);
  res.json({ msg: "OTP sent to email" });
};

// 2️⃣ Verify OTP
exports.verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = await Otp.findOne({ email });

  if (!record) return res.status(400).json({ msg: "Invalid or expired OTP" });

  const isMatch = await bcrypt.compare(otp, record.otpHash);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  await Otp.findOneAndUpdate(
    { email },
    { verified: true },
    { new: true }
  );
console.log("OTP verified for:", email);

  res.json({ msg: "OTP verified" });
};

// 3️⃣ Reset password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const otpRecord = await Otp.findOne({ email });
  console.log("Reset OTP record:", otpRecord);
  if (!otpRecord || !otpRecord.verified) {
    return res.status(403).json({ msg: "OTP verification required" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  await Otp.findOneAndDelete({ email });
  res.json({ msg: "Password updated successfully" });
};

// const User = require("../models/user");
// const Otp = require("../models/otp");
// const {sendEmailOTP} = require("../utils/mailer");
// const bcrypt = require("bcryptjs");


// // 1️⃣ Send OTP to email for reset
// exports.sendResetOtp = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ msg: "User not found" });

//    const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const salt = await bcrypt.genSalt(10);
//   const otpHash = await bcrypt.hash(otp, salt);
//   await Otp.findOneAndUpdate(
//     { email },
//     { 
//         otpHash,
//         expiresAt: new Date(Date.now() + 10 * 60 * 1000) 
//         },
//     { upsert: true, new: true }
//   );

//   await sendEmailOTP(email, otp);
//   res.json({ msg: "OTP sent to email" });
// };

// // 2️⃣ Verify OTP
// exports.verifyResetOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   const record = await Otp.findOne({ email });

//     if (!record) return res.status(400).json({ msg: "Invalid or expired OTP" });

//   const isMatch = await bcrypt.compare(otp, record.otpHash);
//   if (!isMatch) {
//     return res.status(400).json({ msg: "Invalid or expired OTP" });
//   }

//   res.json({ msg: "OTP verified" });
// };

// // 3️⃣ Reset password


// exports.resetPassword = async (req, res) => {
//   const { email, newPassword } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ msg: "User not found" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);

//   user.password = hashedPassword;
//   await user.save();

//   await Otp.findOneAndDelete({ email }); // Optional cleanup
//   res.json({ msg: "Password updated successfully" });
// };
