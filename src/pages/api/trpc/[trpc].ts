/* eslint-disable import/no-unused-modules */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import { env } from '@env/server.mjs'
import { createContext } from '@server/trpc/context'
import { appRouter } from '@server/trpc/router/_app'
import { createNextApiHandler } from '@trpc/server/adapters/next'

// export API handler
export default createNextApiHandler({
    // @ts-ignore
    router: appRouter,
    createContext,
    onError:
        env.NODE_ENV === 'development'
            ? ({ path, error }) => {
                  console.error(`❌ tRPC failed on ${path}: ${error}`)
              }
            : undefined,
})
