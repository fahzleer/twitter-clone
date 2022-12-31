/* eslint-disable import/no-unused-modules */
import styled from 'styled-components'

interface Props {
    onClick?: () => {}
}

const HeartIcon = ({ onClick }: Props) => (
    <BaseWrapper onClick={() => onClick?.()}>
        <svg
            aria-hidden='true'
            className='r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi'
            fill='none'
            height='20'
            viewBox='0 0 24 24'
            width='20'>
            <g>
                <path
                    d='M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z'
                    fill='var(--color-heart)'
                />
            </g>
        </svg>
    </BaseWrapper>
)

export default HeartIcon

const BaseWrapper = styled.div``
