import {
    HeartOutlined,
    SwitcherOutlined,
    UploadOutlined,
    WechatOutlined,
} from '@ant-design/icons'
import HeartIcon from '@assets/icons/HeartIcon'
import type { QueryClient } from '@tanstack/react-query'
import type { RouterInputs, RouterOutputs } from '@utils/trpc'
import { trpc } from '@utils/trpc'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocal from 'dayjs/plugin/updateLocale'
import type { ISODateString } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import updateCache from '../updateCache'

interface DefaultSession {
    user?: {
        id?: string | null
        name?: string | null
        email?: string | null
        image?: string | null
    }
    expires: ISODateString
}

dayjs.extend(relativeTime)
dayjs.extend(updateLocal)

dayjs.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s',
        s: '1m',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1M',
        MM: '%dM',
        y: '1y',
        yy: '%dy',
    },
})

const Tweet = ({
    tweet,
    client,
    input,
}: {
    tweet: RouterOutputs['tweet']['timeline']['tweets'][number]
    client: QueryClient
    input: RouterInputs['tweet']['timeline']
}) => {
    const { data: session } = useSession()

    // @ts-ignore
    const likeMutation = trpc.tweet.like.useMutation({
        onSuccess: (data: any, variables: any) => {
            updateCache({ client, data, variables, input, action: 'like' })
        },
    }).mutateAsync
    // @ts-ignore
    const unlikeMutation = trpc.tweet.unlike.useMutation({
        onSuccess: (data: any, variables: any) => {
            updateCache({ client, data, variables, input, action: 'unlike' })
        },
    }).mutateAsync

    const hasLiked = tweet.likes.length > 0

    return (
        <BaseWrapper>
            <MainTweet>
                {tweet.author.image && (
                    <StyledProfileImage
                        alt={`${tweet.author.name} profile picture`}
                        height={40}
                        src={tweet.author.image}
                        width={40}
                    />
                )}

                <Subtweet>
                    <UserNames>
                        <DisplayName href={`/${tweet.author.name}`}>
                            {tweet.author.name}
                        </DisplayName>
                        <ProfileName href={`/${tweet.author.name}`}>
                            @{/* @ts-ignore */}
                            {tweet.author.name
                                .replace(/\s+/g, ' ')
                                .toLowerCase()}
                        </ProfileName>

                        <DotSymbol>·</DotSymbol>

                        <TimeagoText>
                            {dayjs(tweet.createdAt).fromNow()}
                        </TimeagoText>
                    </UserNames>

                    <TweetText>{tweet.text}</TweetText>

                    {tweet.image && (
                        <StyledTweetImage
                            alt={`Tweet of ${tweet.author.name}`}
                            src={tweet.image}
                        />
                    )}
                </Subtweet>
            </MainTweet>

            <ButtonGroupTweet>
                {/* @ts-ignore */}
                <Reply session={session}>
                    <WechatOutlined />
                </Reply>
                {/* @ts-ignore */}
                <Retweet session={session}>
                    <SwitcherOutlined />
                </Retweet>
                {/* @ts-ignore */}
                <Like changeIconColor={hasLiked} session={session}>
                    {hasLiked ? (
                        <HeartIcon
                            // @ts-ignore
                            onClick={() => {
                                if (hasLiked) {
                                    unlikeMutation({
                                        tweetId: tweet.id,
                                    })
                                    return
                                }
                                likeMutation({
                                    tweetId: tweet.id,
                                })
                            }}
                        />
                    ) : (
                        <HeartOutlined
                            onClick={() => {
                                if (hasLiked) {
                                    unlikeMutation({
                                        tweetId: tweet.id,
                                    })
                                    return
                                }
                                likeMutation({
                                    tweetId: tweet.id,
                                })
                            }}
                        />
                    )}
                    <span>{tweet._count.likes}</span>
                </Like>
                {/* @ts-ignore */}
                <Share session={session}>
                    <UploadOutlined />
                </Share>
            </ButtonGroupTweet>
        </BaseWrapper>
    )
}

export default Tweet

const BaseWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-top-width: 0.0625rem;
    border-bottom-width: 0.0625rem;
    padding: 1.25rem;
    border-color: rgb(243 244 246);
`

const MainTweet = styled.div`
    display: flex;
    margin-right: 0.75rem;
`

const Subtweet = styled.div`
    margin-right: 0.75rem;
`

const UserNames = styled.div`
    display: flex;
    align-items: center;
`

const DisplayName = styled(Link)`
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    margin-right: 0.25rem;
`

const ProfileName = styled(Link)`
    display: none;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgb(113, 118, 123);
    text-decoration: none;
    margin-right: 0.25rem;

    @media (min-width: 40em) {
        display: inline;
    }

    @media (min-width: 64em) {
        display: inline;
    }
`

const DotSymbol = styled.span`
    margin-right: 0.25rem;
    color: rgb(113, 118, 123);
`

const StyledProfileImage = styled(Image)`
    margin-right: 0.75rem;
    border-radius: 9999px;
    object-fit: cover;
`

const TimeagoText = styled.p`
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgb(113, 118, 123);
    margin-right: 0.25rem;
`

const TweetText = styled.p`
    padding-top: 0.25rem;
`

const StyledTweetImage = styled.img`
    max-height: 15rem;
    margin: 1.25rem 1.25rem 0.25rem 0rem;
    border-radius: 0.5rem;
    object-fit: cover;
    box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.05);
`

const ButtonGroupTweet = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.25rem;
    margin-right: 0.75rem;
`

const Reply = styled.div<{ session: DefaultSession }>`
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    color: rgb(113, 118, 123);

    cursor: ${props => (props.session ? 'pointer' : 'not-allowed')};

    * {
        margin-right: 0.75rem;
    }

    ${(props: { session: DefaultSession }) =>
        props.session && `&:hover { color: var(--color-twitter) }`}
`

const Retweet = styled.div<{ session: DefaultSession }>`
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    color: rgb(113, 118, 123);

    cursor: ${props => (props.session ? 'pointer' : 'not-allowed')};

    * {
        margin-right: 0.75rem;
    }

    ${(props: { session: DefaultSession }) =>
        props.session && `&:hover { color: var(--color-twitter) }`}
`

const Like = styled.div<{ changeIconColor: boolean; session: DefaultSession }>`
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    color: rgb(113, 118, 123);

    cursor: ${props => (props.session ? 'pointer' : 'not-allowed')};

    .anticon[tabindex] {
        cursor: ${props => (props.session ? 'pointer' : 'not-allowed')};
    }

    * {
        margin-right: 0.75rem;
    }

    ${(props: { changeIconColor: boolean; session: DefaultSession }) =>
        props.session &&
        !props.changeIconColor &&
        `&:hover { color: var(--color-twitter) }`}
`

const Share = styled.div<{ session: DefaultSession }>`
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    color: rgb(113, 118, 123);

    cursor: ${props => (props.session ? 'pointer' : 'not-allowed')};

    * {
        margin-right: 0.75rem;
    }

    ${(props: { session: DefaultSession }) =>
        props.session && `&:hover { color: var(--color-twitter) }`}
`
