import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUserToken {
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    createdAt?: Date;
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
		timestamps: true,
		expires: 30 * 86400, // 30 days
	},
}); 

const UserTokenModel = mongoose.model("UserToken", userTokenSchema);

export default UserTokenModel;