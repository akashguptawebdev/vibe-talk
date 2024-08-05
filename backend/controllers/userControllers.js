import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname) {
      return res.status(400).json({ message: "fullname is required" });
    }
    if (!username) {
      return res.status(400).json({ message: " username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }
    if (!gender) {
      return res.status(400).json({ message: "gender is required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exist try different " ,
          success:false
        });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    // profilePhoto
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const felmaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullname,
      username,
      password: hashedpassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : felmaleProfilePhoto,
      gender,
    });

    res.status(200).json({ message: "user successfully register", newUser ,success:true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Required All fields");
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "incorrect username or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "incorrect username or password", success: false });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        profilePhoto: user.profilePhoto,
        success:true
      });
  } catch (error) {
    console.log(error);
  }
};
 
export const logout = (req, res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logout successfully",
            success:true
        })
    } catch (error) {
        return res.status(400).json({
          message:"Internal server Error",
          success:false
        })
    }
};
 
export const getOtherUsers = async (req, res)=>{
  try {
    const loggedInUserId = req.id;
    const otherUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
    return res.status(200).json(otherUser);
  } catch (error) {
    console.log(error)
  }
}