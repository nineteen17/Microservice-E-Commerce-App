import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      body: {
        user?: {
          userId: string;
          email: string;
        };
      };
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(403)
      .json({ error: true, message: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    ) as jwt.JwtPayload;

    if (decoded._id && decoded.email) {
      const originalUser = req.body.user
      req.body.user = {
        ...originalUser,
        userId: decoded._id,
        email: decoded.email,
      };
    } else {
      return res
        .status(403)
        .json({ error: true, message: "Invalid token payload" });
    }

    next();
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ error: true, message: "Access Denied: Invalid token" });
  }
};

export default authMiddleware;