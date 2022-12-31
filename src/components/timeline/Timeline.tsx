import { ReloadOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import type { RouterInputs } from '@utils/trpc'
import { trpc } from '@utils/trpc'
import useScrollPosition from 'hooks/useScrollPosition'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import CreateTweet from './CreateTweet'
import Tweet from './Tweet'

const LIMIT = 5

const Timeline = ({
    where = {},
}: {
    where?: RouterInputs['tweet']['timeline']['where']
}) => {
    const scrollPosition = useScrollPosition()

    const { data, hasNextPage, fetchNextPage, isFetching } =
        // @ts-ignore
        trpc.tweet.timeline.useInfiniteQuery(
            {
                limit: LIMIT,
                where,
            },
            {
                // @ts-ignore
                getNextPageParam: lastPage => lastPage.nextCursor,
            },
        )

    const client = useQueryClient()

    // @ts-ignore
    const tweets = data?.pages.flatMap(page => page.tweets) ?? []

    const handleRefreshData = () => {
        const refreshToast = toast.loading('Refreshing...')

        fetchNextPage()

        toast.success('Sussceful refreshed yayyy...!!', {
            id: refreshToast,
        })
    }

    useEffect(() => {
        if (scrollPosition > 90 && hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }, [scrollPosition, hasNextPage, isFetching, fetchNextPage])

    return (
        <BaseWrapper>
            <FeedWrapper>
                <Title>Home</Title>
                <StyledReloadOutlinedIcon
                    onClick={() =>
                        hasNextPage && !isFetching && handleRefreshData()
                    }
                />
            </FeedWrapper>

            <CreateTweetWrapper>
                <CreateTweet />
            </CreateTweetWrapper>

            {/* Feed */}
            <TweetWrapper>
                {tweets.map((tweet: any) => {
                    return (
                        <Tweet
                            client={client}
                            input={{
                                where,
                                limit: LIMIT,
                            }}
                            key={tweet.id}
                            tweet={tweet}
                        />
                    )
                })}

                {!hasNextPage && <p>No more items to load</p>}
            </TweetWrapper>
        </BaseWrapper>
    )
}

export default Timeline

const BaseWrapper = styled.div`
    max-height: 100vh;
    overflow: scroll;
    margin-right: 2.5rem;
    grid-column: span 7 / span 7;
    border-left-width: 0.0625rem;
    border-right-width: 0.0625rem;
    border-left-color: rgb(47, 51, 54);
    border-right-color: rgb(47, 51, 54);
    border-left-style: solid;
    border-right-style: solid;

    ::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 64em) {
        grid-column: span 5 / span 5;
    }
`

const FeedWrapper = styled.div`
    display: flex;
    max-height: 3.3125rem;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(12px);
`

const Title = styled.h1`
    padding: 1.25rem 1.25rem 1.25rem 1.25rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
`

const StyledReloadOutlinedIcon = styled(ReloadOutlined)`
    height: 2rem;
    width: 2rem;
    color: var(--color-twitter);
    margin-right: 1.25rem;
    margin-top: 1.25rem;
    transition-property: all;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

    cursor: pointer;

    :hover {
        transform: scale(1.5);
    }

    :active {
        transform: scale(1.25);
    }
`

const CreateTweetWrapper = styled.div``

const TweetWrapper = styled.div``
