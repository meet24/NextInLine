import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// 🔐 Login Schema
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

// 📝 Signup Schema
export const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    ),

  contactNumber: Yup.string()
    .required("Phone number is required")
    .test("is-valid", "Enter a valid phone number", (value) => {
      const cleaned = value?.replace(/\s/g, "") || "";
      const phone = parsePhoneNumberFromString(cleaned);
      return phone?.isValid() && phone.nationalNumber.length === 10;
    }),
});
