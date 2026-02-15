import bcrypt from "bcrypt";
import getDB from '../config/connection.js'
import { generateToken } from "../lib/tokenUtils.js";
import transporter from "../config/nodemailer.js";
import { PASSWORD_RESET_TEMPLATE, PASSWORD_RESET_SUCCESSFULLY_TEMPLATE } from "../config/emailTemplates.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role, college, phone } = req.body;
  const db = await getDB();

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Insert user
    const [result] = await db.query(
      `INSERT INTO users (name,email, password, role, college, phone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, college || null, phone || null]
    );

    //  Success
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: result.insertId
    });

  } catch (error) {
    console.log("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  } finally {
    db.release();
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const db = await getDB();

  if (!email || !password)
    return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const [user] = await db.query(
        "SELECT id, password FROM users WHERE email = ?",
        [email]
      );

    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

   // Generate Token
    generateToken(user[0].id,res);

    res.status(200).json({ success: true, message: "Login Success" });

  } catch (error) {
    console.log("Error in loginUser:", error);
    return res.status(500).json({ success: false, message: error.message });
  } finally{
    db.release();
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log("Error in logoutUser:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// export const sendVerifyOtp = async (req, res) => {
//   const db = await getDB();
//   const userId = req.userId;

//   if (!userId)
//     return res.json({
//       success: false,
//       message: "Something Went Wrong ! Login Again",
//     });

//   try {
//     const user = await db.query(
//       "SELECT email, is_verified, resetOtp, resetOtpExpiryAt FROM users WHERE id = ?",
//       [userId]
//     );
//     console.log(user[0]);
//     console.log(user[0].is_verified);

//     if (user[0].is_verified)
//       return res.json({ success: false, message: "User Already Verified" });

//     const otp = String(Math.floor(100000 + Math.random() * 900000));

//     await db.query(
//       "UPDATE users SET resetOtp = ?, resetOtpExpiryAt = ? WHERE id = ?",
//       [otp, Date.now() + 24 * 60 * 60 * 1000, userId]
//     );

//     const mailOption = {
//       from: process.env.SENDER_EMAIL,
//       to: user[0].email,
//       subject: "Account Verification OTP",
//       html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
//         "{{email}}",
//         user[0].email
//       ),
//     };

//     await transporter.sendMail(mailOption);

//     return res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     console.log("Error in sendVerifyOtp:", error);
//     return res.json({ success: false, message: error.message });
//   }finally{
//     db.release();
//   }
// };

export const isAuthenticated = async (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const verifyEmail = async (req, res) => {
//   const db = await getDB();
//   const userId = req.userId;
//   const { otp, email } = req.body;

//   if (!userId)
//     return res.json({
//       success: false,
//       message: "Not Authorized, Please login again",
//     });

//   if (!otp) return res.json({ success: false, message: "Missing Details" });

//   try {
//     const user = await db.query(
//       "SELECT verifyOtp, verifyOtpExpireAt FROM users WHERE id = ? AND email = ?",
//       [userId, email]
//     );

//     if (!user[0]) return res.json({ success: false, message: "User Not Found" });

//     if (user[0].verifyOtp === "" || user[0].verifyOtp !== otp)
//       return res.json({ success: false, message: "Invalid OTP" });

//     if (user[0].verifyOtpExpireAt < Date.now())
//       return res.json({ success: false, message: "OTP Expired, Send Again" });

//     await db.query(
//       "UPDATE users SET isAccountVerified = 1, verifyOtp = '', verifyOtpExpireAt = 0 WHERE id = ?",
//       [userId]
//     );
//     return res.json({ success: true, message: "Email Verified Successfully" });
//   } catch (error) {
//     console.log("Error in verifyEmail:", error);
//     return res.json({ success: false, message: error.message });
//   } finally {
//     db.release();
//   }
// };

export const sendResetOtp = async (req, res) => {
  const db = await getDB();
  const { email } = req.body;

  if (!email) return res.json({ success: false, message: "Email is Required" });

  try {
    const user = await db.query(
      "SELECT id, email FROM users WHERE email = ?",
      [email]
    );

    if (!user[0]) return res.json({ success: false, message: "User Not Found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    await db.query(
      "UPDATE users SET resetOtp = ?, resetOtpExpireAt = ? WHERE id = ?",
      [otp, Date.now() + 20 * 60 * 1000, user[0].id]
    );

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user[0].email,
      subject: "Password Reset OTP",
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user[0].email
      ),
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: "Reset OTP sent successfully" });
  } catch (error) {
    console.log("Error in sendResetOtp:", error);
    return res.json({ success: false, message: error.message });
  } finally {
    db.release();
  }
};

export const resetPassword = async (req, res) => {
  const db = await getDB();
  const { email, otp, newPassword } = req.body;

  if (!email) return res.json({ success: false, message: "Email is required" });

  if (!otp) return res.json({ success: false, message: "OTP is required" });

  if (!newPassword)
    return res.json({ success: false, message: "Password is required" });

  try {
    const user = await db.query(
      "SELECT id, resetOtp, resetOtpExpireAt FROM users WHERE email = ?",
      [email]
    );

    if (!user[0]) return res.json({ success: false, message: "User Not Found" });

    if (user[0].resetOtp === "" || user[0].resetOtp !== otp)
      return res.json({ success: false, message: "Invalid OTP" });

    if (user[0].resetOtpExpireAt < Date.now())
      return res.json({
        success: false,
        message: "OTP expired, request again",
      });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET password = ?, resetOtp = '', resetOtpExpireAt = 0 WHERE id = ?",
      [hashedPassword, user[0].id]
    );

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user[0].email,
      subject: "Password Reset Successfully",
      text: `Your Password for ${email} is reset successfully.`,
      html: PASSWORD_RESET_SUCCESSFULLY_TEMPLATE.replace(
        "{{email}}",
        user[0].email
      ),
    };

    await transporter.sendMail(mailOption);

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log("Error in resetPassword:", error);
    return res.json({ success: false, message: error.message });
  } finally {
    db.release();
  }
};
