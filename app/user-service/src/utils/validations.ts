import { z } from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
  });
  
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const RefreshTokenShema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
}) 

  // OTHER
  const envVariables = z.object({
    USER_MONGO_URI: z.string(),
    ACCESS_TOKEN_PRIVATE_KEY: z.string(),
    REFRESH_TOKEN_PRIVATE_KEY: z.string(),
    AMQP_URL: z.string()
  })

  export const myEnvVariables = envVariables.parse(
    process.env
  )

  declare global {
    namespace NodeJS {
        interface ProcessEnv
           extends z.infer<typeof envVariables> {}
    }
  }

