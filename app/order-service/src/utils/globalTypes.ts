import { z } from 'zod'

const envVariables = z.object({
    USER_MONGO_URI: z.string(),
    ACCESS_TOKEN_PRIVATE_KEY: z.string(),
    REFRESH_TOKEN_PRIVATE_KEY: z.string(),
    AMQP_URL: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string()
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
