import Timeline from '@components/timeline/Timeline'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const UserPage = () => {
    const router = useRouter()

    const name = router.query.name as string
    return (
        <BaseWrapper>
            <Timeline
                where={{
                    author: {
                        name,
                    },
                }}
            />
        </BaseWrapper>
    )
}

export default UserPage

const BaseWrapper = styled.div``
