import mongoose from "mongoose";
import { IUser } from "./user";

const Schema = mongoose.Schema;

export interface IUserToken {
    userId: IUser._id,
    token: string,
    createdAt: Date,
}
const userTokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
});

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;