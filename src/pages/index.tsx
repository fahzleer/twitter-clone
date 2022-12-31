import Sidebar from '@components/sidebar/Sidebar'
import Timeline from '@components/timeline/Timeline'
import Widgets from '@components/widgets/Widgets'
import { type NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import styled from 'styled-components'

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Twitter Clone</title>
                <meta content='Generated by create-t3-app' name='description' />
                <link href='/favicon.ico' rel='icon' />
            </Head>

            <Toaster />

            <BaseWrapper>
                <Main>
                    <Sidebar />
                    <Timeline />
                    <Widgets />
                </Main>
            </BaseWrapper>
        </>
    )
}

export default Home

const BaseWrapper = styled.div`
    margin: 0 auto;
    max-height: 100vh;
    overflow: hidden;

    @media (min-width: 64em) {
        max-width: 79.0625rem;
    }
`

const Main = styled.div`
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
`
