import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const Widgets = () => {
    return (
        <BaseWrapper>
            <SearchWrapper>
                <StyledSearchOutlinedIcon />
                <StyledSearchInput placeholder='Search Twitter' type='text' />
            </SearchWrapper>
        </BaseWrapper>
    )
}

export default Widgets

const BaseWrapper = styled.div`
    display: none;
    margin-top: 0.5rem;
    grid-column: span 2 / span 2;

    @media (min-width: 64em) {
        display: inline;
    }
`

const SearchWrapper = styled.div`
    display: flex;
    padding: 0.75rem 1.25rem 0.75rem 1.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: center;
    background-color: rgb(32, 35, 39);
    border-radius: 9999px;
    border-width: 0.0625rem;
    border-color: rgb(0, 0, 0);
    border-style: solid;
`

const StyledSearchOutlinedIcon = styled(SearchOutlined)`
    width: 1.25rem;
    padding-left: 0.75rem;
    color: rgb(113, 118, 123);
`

const StyledSearchInput = styled.input`
    flex: 1 1 0%;
    margin: 0.21875rem 0 0.21875rem 0;
    padding: 0;
    padding-inline-start: 1.25rem;
    padding-inline-end: 1.25rem;
    border: 0;
    outline: none;
    transition: all 0.3s;
    background-color: transparent;
    color: inherit;
`
