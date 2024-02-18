import { Request, Response } from 'express';
import { UserModel }from '../models/user';
import UserTokenModel from '../models/userToken';
import generateTokens from '../utils/generateTokens';
import verifyRefreshToken from '../utils/verifyRefreshToken';
import bcrypt from 'bcryptjs';
import { errorMessage } from '../utils/errorMessage';

export const registerController = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new UserModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err });
    }
};


export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.status(200).json({ refreshToken, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err });
    }
};


export const logoutController = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        await UserTokenModel.findOneAndDelete({ token: refreshToken });

        res.clearCookie('accessToken');

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error logging out", error: err });
    }
};


export const refreshTokenController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    try {
        const { userId } = await verifyRefreshToken(refreshToken);

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user);

        await UserTokenModel.findOneAndUpdate({ userId: user._id }, { token: newRefreshToken }, { new: true });

        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'strict' });
        res.status(200).json({ refreshToken: newRefreshToken, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Error refreshing token", error: errorMessage(err) });
    }
};

