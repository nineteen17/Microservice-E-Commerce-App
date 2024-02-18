import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { ProductModel } from '../models/product';
import bcrypt from 'bcryptjs';
import { errorMessage } from '../utils/errorMessage';

export const getUserProfile = async (req: any, res: Response) => {
    
    try {
        const user = await UserModel.findById(req.user._id).populate('watchlist');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        

        if (user) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                watchlist: user.watchlist,
            }).status(200)
        } else {
            res.status(404);
            throw new Error('User not found')
        }
    } catch (err) {
        res.status(500).json({ message: "Error getting user", error: err });
    }
} 

export const updateUserProfile = async (req: any, res: Response) => {

    try {
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.body.oldPassword && req.body.newPassword) {

            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 12);
            user.password = hashedNewPassword;
        }

        if (req.body.email && req.body.email !== user.email) {
            user.email = req.body.email;
        }
        if (req.body.firstName && req.body.firstName !== user.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName && req.body.lastName !== user.lastName) {
            user.lastName = req.body.lastName;
        }
        if (req.body.phoneNumber && req.body.phoneNumber !== user.phoneNumber) {
            user.phoneNumber = req.body.phoneNumber;
        }

        if (user.isModified()) {
            const updatedUser = await user.save();
            res.json({
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phoneNumber: updatedUser.phoneNumber,
            });
        };
    } catch (err) {
        res.status(500).json({ message: "Error updating user profile", error: err });
    }
};

export const addWatchlistProduct = async (req: any, res: Response) => {
    try {
        const { productId } = req.params;
        const user = await UserModel.findById(req.user._id);
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (user) {
            if (user.watchlist && !user.watchlist.includes(productId)) {
                user.watchlist.push(productId);
                await user.save();
                res.status(200).json({ message: "Product added to watchlist" });
            } else {
                res.status(400).json({ message: "Product already in watchlist" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding to watchlist", error: errorMessage(err) });
    }
};


export const deleteWatchlistProduct = async (req: any, res: Response) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.watchlist = user.watchlist || [];
        console.log("user.watclist:", user.watchlist);

        const productIndex = user.watchlist.findIndex(item => item._id?.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in watchlist" });
        }

        user.watchlist.splice(productIndex, 1);
        user.markModified('watchlist');
        await user.save();

        res.status(200).json({ message: "Product removed from watchlist" });
    } catch (error) {
        console.error("Delete Watchlist Product Error:", error);
        res.status(500).json({ message: "Error removing product from watchlist", error: errorMessage(error)});
    }
};