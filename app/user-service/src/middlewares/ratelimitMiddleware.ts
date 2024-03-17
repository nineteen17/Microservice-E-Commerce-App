import RateLimit from 'express-rate-limit';

export const rateLimitMiddleware = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again after 15 minutes"
});
