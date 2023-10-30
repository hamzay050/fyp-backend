import bcrypt from "bcrypt";
import _ from "lodash";
import jwt from "jsonwebtoken"; // Replace with the JWT library of your choice
import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer"; // Use nodemailer for sending emails
import pkg from "../models/mongooseModels/clients.mjs";
import { accessToken } from "../common/token.mjs";
async function signup(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const checker = await pkg.Clients.findOne({ email });

    if (!checker) {
      const hashPassword = await bcrypt.hash(password, process.env.SALT);

      const newUser = new pkg.Clients({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });

      await newUser.save();

      // Generate a JWT token
      const userData = {
        userId: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };
      const token = jwt.sign(userData, process.env.SECRET, {
        expiresIn: "86400s",
      });

      res.cookie("accessToken", token);

      return res.status(200).json({
        message: "Your account has been created successfully!",
        token,
      });
    } else {
      return res.status(400).json({ error: "Email is already in use!" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error });
  }
}
async function login(req, res) {
  const { email, password } = req.body;

  let userData = {};
  try {
    let hashPassword = await bcrypt.hash(password, process.env.SALT);
    const record = await pkg.Clients.findOne({
      email: email,
      password: hashPassword,
    });
    if (!record)
      return res
        .status(500)
        .json({ error: { message: "Email or password is invalid!" } });

    userData = {
      userId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
    };

    const token = await accessToken(userData);
    res.cookie("accessToken", token);

    return res.status(200).json({
      message: "Your account has been created successfully!",
      token,
      data: userData,
    });
  } catch (error) {
    console.log("🚀 ~ file: auth.mjs:85 ~ login ~ error:", error);
    return res.status(500).json({ error });
  }
}
// async function login(req, res) {
//   const { email, password } = req.body;

//   try {
//     const user = await pkg.Clients.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ error: "Email not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Email or password is invalid!" });
//     }

//     const userData = {
//       userId: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       //   admin: user.isAdmin,
//     };

//     const token = jwt.sign(userData, process.env.SECRET);
//     res.cookie("accessToken", token);
//     return res.json({
//       status: 200,
//       message: "Successfully login!",
//       data: userData,
//       token: token,
//     });
//   } catch (error) {
//     console.log("🚀 ~ file: auth.mjs:73 ~ login ~ error:", error);
//     return res.status(500).json({ error });
//   }
// }

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await pkg.Clients.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email is not registered!" });
    } else {
      // Generate a reset token and save it to the user's document
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      const transporter = nodemailer.createTransport({
        // Set up your email transporter configuration here
      });

      const resetLink = `http://example.com/resetPassword?token=${token}`;

      const html = await ejs.renderFile(template, {
        token: resetLink,
        name: user.email,
        user: "We received your request to reset your password.",
        header: "Trouble signing in?",
        buttonText: "Reset Password",
        footer:
          "You received this email because you requested to reset your password. If you did not, please contact us immediately.",
      });

      const mailOptions = {
        to: email,
        subject: "Reset Password",
        html,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          return res.status(200).json({ message: "Kindly check your email!" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function resetPassword(req, res) {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await pkg.Clients.findOne({
      email: decoded.email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashPassword = await bcrypt.hash(password, 10); // Use the desired number of salt rounds

    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      status: 200,
      message: "Password reset successfully",
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error occurred while resetting the password" });
  }
}

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await pkg.Clients.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "pkg not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Use the desired number of salt rounds

    user.password = hashedPassword;
    await user.save();

    // Generate a new JWT token with updated user data
    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // admin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      status: 200,
      message: "Successfully Change Password!",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while changing the password",
      error,
    });
  }
};

async function logout(req, res) {
  const userId = req.user.userId;

  try {
    // Clear the token on the client side
    res.clearCookie("accessToken");

    // Set user's online status to false
    await pkg.Clients.findByIdAndUpdate(userId, { isOnline: false });

    return res.status(200).json({
      status: 200,
      message: "Successfully logout!",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export { signup, login, forgotPassword, resetPassword, changePassword, logout };
