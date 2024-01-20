import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const sign_up = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: IUser | any = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sign_in = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | any | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token: string = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user_id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
