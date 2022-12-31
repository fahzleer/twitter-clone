import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import styled from 'styled-components'

interface IconBaseComponent
    extends React.ForwardRefExoticComponent<
        AntdIconProps & React.RefAttributes<HTMLSpanElement>
    > {}

interface Props {
    Icon: IconBaseComponent
    title: string
    onClick?: () => {}
}

const SidebarRow = ({ Icon, title, onClick }: Props) => {
    return (
        <BaseWrapper onClick={() => onClick?.()}>
            <IconWrapper>
                <Icon />
            </IconWrapper>
            <Title>{title}</Title>
        </BaseWrapper>
    )
}

export default SidebarRow

const BaseWrapper = styled.span`
    display: flex;
    max-width: fit-content;
    align-items: center;
    padding: 0.75rem 1rem 0.75rem 1rem;
    border-radius: 9999px;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
    cursor: pointer;

    span,
    p {
        margin-right: 0.5rem;
    }

    &:hover {
        background-color: rgba(231, 233, 234, 0.1);
    }
`

const IconWrapper = styled.span`
    height: 1.5rem;
    width: 1.5rem;
`

const Title = styled.p`
    display: none;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 300;
    color: inherit;

    &:hover {
        color: inherit;
    }

    @media (min-width: 48em) {
        display: inline-flex;
    }

    @media (min-width: 64em) {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
`
