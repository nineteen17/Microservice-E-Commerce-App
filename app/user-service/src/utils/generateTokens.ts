import jwt from "jsonwebtoken";
import UserTokenModel from "../models/userToken";
import { IUser } from "../models/user";

const generateTokens = async (user: IUser) => {

	try {
		const payload = { userId: user._id, email: user.email };
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: "1m" }
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			{ expiresIn: "30d" }
		);

		const userToken = await UserTokenModel.findOne({ userId: user._id });
		if (userToken) await userToken.deleteOne();

		await new UserTokenModel({ userId: user._id, token: refreshToken }).save();
		return Promise.resolve({ accessToken, refreshToken });
	} catch (err) {
		return Promise.reject(err);
	}
};

export default generateTokens;