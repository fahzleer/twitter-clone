import { router } from '../trpc'
import { authRouter } from './auth'
import { tweetRouter } from './tweet'

export const appRouter = router({
    // @ts-ignore
    tweet: tweetRouter,
    // @ts-ignore
    auth: authRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
