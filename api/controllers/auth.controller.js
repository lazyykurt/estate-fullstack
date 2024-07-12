import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hashSync(password, saltRounds);

    await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // create cookie token and send it back to the user

    const age = 1000 * 60 * 60 * 24 * 28; // 4 weeks

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login successfully", userInfo });
  } catch (error) {
    console.log("Error logging in: ", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successfully" });
};
