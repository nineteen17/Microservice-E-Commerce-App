import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
      interface Request {
        user?: jwt.JwtPayload | string; 
      }
    }
  }

  const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    console.log(req.headers, req.header);
    
    if (!token)
        return res
            .status(403)
            .json({ error: true, message: "Access Denied: No token provided" });

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_PRIVATE_KEY
        ) as jwt.JwtPayload; // Cast to JwtPayload for TypeScript

        // Assuming the user's ID is stored in the token payload under `_id`
        if (decoded._id) {
            req.user = { _id: decoded._id }; // Or simply req.user = decoded._id; based on your preference
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