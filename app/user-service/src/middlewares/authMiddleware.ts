import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
      interface Request {
        user?: jwt.JwtPayload | string; // Adjust according to your token payload
      }
    }
  }

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("x-access-token");
	if (!token)
		return res
			.status(403)
			.json({ error: true, message: "Access Denied: No token provided" });

	try {
		const tokenDetails = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_PRIVATE_KEY
		);
		req.user = tokenDetails;
		next();
	} catch (err) {
		console.log(err);
		res
			.status(403)
			.json({ error: true, message: "Access Denied: Invalid token" });
	}
};

export default authMiddleware;