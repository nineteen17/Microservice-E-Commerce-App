import UserTokenModel, { IUserToken } from "../models/userToken";
import jwt from "jsonwebtoken";

interface DecodedToken {
    userId: string;
}

const verifyRefreshToken = (refreshToken: string): Promise<DecodedToken> => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
        UserTokenModel.findOne({ token: refreshToken }, (tokenDoc: IUserToken) => {
            if (!tokenDoc) {
                return reject({ error: true, message: "Invalid refresh token" });
            }

            jwt.verify(refreshToken, privateKey, (err, decoded) => {
                if (err) {
                    return reject({ error: true, message: "Invalid refresh token" });
                }

                const payload = decoded as DecodedToken; // Cast decoded to DecodedToken
                if (payload.userId) {
                    resolve(payload);
                } else {
                    reject({ error: true, message: "Invalid token payload" });
                }
            });
        });
    });
};

export default verifyRefreshToken;
