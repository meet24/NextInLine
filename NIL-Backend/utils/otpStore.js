const bcrypt = require('bcryptjs');
const OtpModel = require('../models/otp');

exports.generateAndStoreOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpHash = await bcrypt.hash(otp, 10);

  await OtpModel.findOneAndDelete({ email }); // delete any previous OTP

  await OtpModel.create({
    email,
    otpHash,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  });

  return otp;
};

exports.verifyOtp = async (email, otp) => {
  const record = await OtpModel.findOne({ email });

  if (!record || record.expiresAt < new Date()) {
    await OtpModel.deleteOne({ email });
    return false;
  }

  const match = await bcrypt.compare(otp, record.otpHash);

  if (match) {
    await OtpModel.deleteOne({ email }); // One-time use
  }

  return match;
};


//Without Database
// const otpMap = new Map(); // { email: { otp, expiresAt } }

// exports.otpStore = {
//   generate: (email) => {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpMap.set(email, {
//       otp,
//       expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
//     });
//     return otp;
//   },

//   verify: (email, otp) => {
//     const data = otpMap.get(email);
//     if (!data) return false;
//     if (Date.now() > data.expiresAt) {
//       otpMap.delete(email);
//       return false;
//     }
//     const match = data.otp === otp;
//     if (match) otpMap.delete(email); // one-time use
//     return match;
//   },
// };
