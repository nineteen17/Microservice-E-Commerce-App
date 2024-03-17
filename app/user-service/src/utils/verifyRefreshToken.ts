import UserTokenModel, { IUserToken } from "../models/userToken";
import jwt from "jsonwebtoken";

interface DecodedToken {
    userId: string;
}

const verifyRefreshToken = (refreshToken: string): Promise<DecodedToken> => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise(async (resolve, reject) => {
        try {
            const tokenDoc = await UserTokenModel.findOne({ token: refreshToken });
            if (!tokenDoc) {
                return reject({ error: true, message: "Invalid refresh token" });
            }

            jwt.verify(refreshToken, privateKey, (err, decoded) => {
                if (err) {
                    return reject({ error: true, message: "Invalid refresh token" });
                }

                console.log("Decoded Token:", decoded);
                const payload = decoded as DecodedToken;
                if (payload.userId) {
                    resolve(payload);
                } else {
                    reject({ error: true, message: "Invalid token payload" });
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

export default verifyRefreshToken;
