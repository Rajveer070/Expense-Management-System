import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerControllers = async (req, res, next) => {
  try {
    const { name, email, password, mobileNo } = req.body;

    if (!name || !email || !password || !mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobileNo,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const loginControllers = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const setAvatarController = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const imageData = req.body.image;

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: imageData,
      },
      { new: true }
    );

    return res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};
// export const loginControllers = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter all fields",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect Email or Password",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//         isAdmin: user.isAdmin, // Include any other relevant user information
//       },
//       process.env.JWT_SECRET, // Use a secure secret key for signing the token
//       { expiresIn: "1h" } // Token expires in 1 hour, adjust as needed
//     );

//     // Send token in response
//     return res.status(200).json({
//       success: true,
//       message: `Welcome back, ${user.name}`,
//       token,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export const allUsers = async (req, res, next) => {
  try {
    const user = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.json(user);
  } catch (err) {
    next(err);
  }
};
