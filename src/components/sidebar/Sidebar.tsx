import {
    BellOutlined,
    BookOutlined,
    HomeOutlined,
    MailOutlined,
    MoneyCollectOutlined,
    MoreOutlined,
    TagOutlined,
    UserOutlined,
} from '@ant-design/icons'
import SVGTwitterIcon from '@assets/icons/SVGTwitterIcon'
import { signIn, signOut, useSession } from 'next-auth/react'
import styled from 'styled-components'
import SidebarRow from './SidebarRow'

const Sidebar = () => {
    const { data: session } = useSession()

    return (
        <>
            <BaseWrapper>
                <SVGTwitterIcon />

                <SidebarRow Icon={HomeOutlined} title='Home' />
                <SidebarRow Icon={TagOutlined} title='Explore' />
                <SidebarRow Icon={BellOutlined} title='Notifications' />
                <SidebarRow Icon={MailOutlined} title='Messages' />
                <SidebarRow Icon={BookOutlined} title='Bookmarks' />
                <SidebarRow Icon={MoneyCollectOutlined} title='Lists' />
                <SidebarRow
                    Icon={UserOutlined}
                    onClick={session ? signOut : signIn}
                    title={session ? 'Sign Out' : 'Sign In'}
                />
                <SidebarRow Icon={MoreOutlined} title='More' />
            </BaseWrapper>
        </>
    )
}

export default Sidebar

const BaseWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: span 2 / span 2;

    @media (min-width: 48em) {
        align-items: start;
    }

    @media (min-width: 64em) {
        max-width: 17.1875rem;
    }
`
