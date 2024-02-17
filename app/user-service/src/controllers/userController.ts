import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { ProductModel } from '../models/product';
import bcrypt from 'bcryptjs';

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
                washlist: user.watchlist,
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

        // Check if the request includes an old password and a new password
        if (req.body.oldPassword && req.body.newPassword) {
            // Compare the old password with the user's hashed password in the database
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch) {
                // If the old password doesn't match, return an error response
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            // If the old password matches, hash the new password and set it to the user's password
            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 12);
            user.password = hashedNewPassword;
        }
        // Update other user fields
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
        // Save the updated user to the database
        if (user.isModified()) {
            const updatedUser = await user.save();
            res.json({
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                phoneNumber: updatedUser.phoneNumber,
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating user profile", error: err });
    }
};

export const addWatchlistProduct = async (req: any, res: Response) => {
    try {
        const { productId } = req.params;
        const user = await UserModel.findById(req.user._id);
        const localProduct = await ProductModel.findById(productId);

        if (localProduct) {
            user?.watchlist?.includes(productId)
        }
        // item doesnt exist in local user db
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding to watchlist", error: err });
    }
};

export const deletWatchlistProduct = async (res: Response, req: Request) => {

    try {
        console.log("delete");
        
    } catch (err) {
        res.status(500).json({ message: "Error deleting product to==in watchlist", error: err });
    }
}