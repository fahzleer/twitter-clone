import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import '@styles/globals.css'

import { trpc } from '@utils/trpc'

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
    )
}

export default trpc.withTRPC(MyApp)
