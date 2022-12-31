import {
    AimOutlined,
    CalendarOutlined,
    FileImageOutlined,
    SearchOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons'
import addImage from '@components/addImage'
import { trpc } from '@utils/trpc'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import styled from 'styled-components'
import { object, string } from 'zod'

export const tweetSchema = object({
    text: string({
        required_error: 'Tweet text is required',
    })
        .min(1)
        .max(280),
    image: string({
        required_error: 'Tweet image is required',
    }),
})

const CreateTweet = () => {
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

    const { data: session } = useSession()

    // @ts-ignore
    const imageInputRef = useRef<HTMLInputElement>(undefined)

    const utils = trpc.useContext()

    // @ts-ignore
    const { mutateAsync } = trpc.tweet.createTweet.useMutation({
        onSuccess: () => {
            setText('')

            // @ts-ignore
            utils.tweet.timeline.invalidate()
        },
    })

    const postTweet = async () => {
        const tweetToast = toast.loading('WooHoo posting tweet...')

        try {
            await tweetSchema.parse({ text, image })
        } catch (e) {
            // @ts-ignore
            setError(e.message)
            return
        }

        mutateAsync({ text, image })

        toast('Sussceful tweet posted yayyy...!!', {
            id: tweetToast,
            icon: '🚀',
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        postTweet()

        setText('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }

    return (
        <>
            {error && JSON.stringify(error)}

            <BaseWrapper>
                <StyledImage
                    alt='Profile Picture'
                    src={
                        session?.user?.image ||
                        'https://cdn-icons-png.flaticon.com/512/552/552721.png'
                    }
                />
                <FormWrapper>
                    <StyledForm onSubmit={handleSubmit}>
                        <StyledInput
                            onChange={e => setText(e.target.value)}
                            placeholder={
                                session?.user?.name
                                    ? `Yo, what's happening, ${session?.user?.name}?`
                                    : "Yo, what's happening, man?"
                            }
                            type='text'
                            value={text}
                        />
                        <Toolbar>
                            <IconWrapper>
                                <FileImageOutlined
                                    onClick={() => {
                                        /* eslint-disable no-unused-expressions */
                                        session &&
                                            setImageUrlBoxIsOpen(
                                                !imageUrlBoxIsOpen,
                                            )
                                    }}
                                />
                                <AimOutlined />
                                <ThunderboltOutlined />
                                <CalendarOutlined />
                                <SearchOutlined />
                            </IconWrapper>
                            <Button disabled={!text || !session} type='submit'>
                                Tweet
                            </Button>
                        </Toolbar>

                        {imageUrlBoxIsOpen && (
                            <ImageUrlBoxForm>
                                <ImageUrlBoxInput
                                    placeholder='Enter Image URL...'
                                    ref={imageInputRef}
                                    type='text'
                                />
                                <ImageUrlBoxButton
                                    onClick={e => {
                                        addImage({
                                            e,
                                            setImage,
                                            setImageUrlBoxIsOpen,
                                            imageInputRef,
                                        })
                                    }}
                                    type='submit'>
                                    Add Image
                                </ImageUrlBoxButton>
                            </ImageUrlBoxForm>
                        )}

                        {image && (
                            <ImageUrlBoxWrapper>
                                <ImageUrlBox
                                    alt={`Picture of ${session?.user?.name}`}
                                    layout='fill'
                                    objectFit='contain'
                                    priority
                                    sizes='100%'
                                    src={image}
                                />
                            </ImageUrlBoxWrapper>
                        )}
                    </StyledForm>
                </FormWrapper>
            </BaseWrapper>
        </>
    )
}

export default CreateTweet

const BaseWrapper = styled.div`
    display: flex;
    padding: 1.25rem;
    border-bottom-width: 0.0625rem;
    border-bottom-color: rgb(47, 51, 54);
    border-bottom-style: solid;

    img,
    div {
        margin-right: 0.5rem;
    }
`

const StyledImage = styled.img`
    width: 3.5rem;
    height: 3.5rem;
    margin-top: 1rem;
    object-fit: cover;
    border-radius: 9999px;
    background-color: rgb(231, 233, 234);
`

const FormWrapper = styled.div`
    display: flex;
    padding-left: 0.5rem;
    flex: 1 1 0%;
    align-items: center;
`

const StyledForm = styled.form`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
`

const StyledInput = styled.input`
    width: 100%;
    height: 6rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    border: 0;
    outline: none;
    color: inherit;
    background-color: rgb(0, 0, 0);

    ::placeholder {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
`

const Toolbar = styled.div`
    display: flex;
    align-items: center;
`

const IconWrapper = styled.div`
    display: flex;
    flex: 1 1 0%;

    span {
        height: 1.25rem;
        width: 1.25rem;
        color: var(--color-twitter);
        margin-right: 0.5rem;
        transition-property: transform;
        transition-duration: 150ms;
        transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        cursor: pointer;

        &:hover {
            transform: scale(1.5);
        }
    }
`

const Button = styled.button<{ disabled: boolean }>`
    min-height: 2.25rem;
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    background-color: var(--color-twitter);
    font-weight: 700;
    color: rgb(255 255 255);
    border-radius: 9999px;
    border: 0;
    outline: none;

    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

    :disabled {
        opacity: ${props => (props.disabled ? '0.5' : '0')};
    }
`

const ImageUrlBoxForm = styled.form`
    display: flex;
    padding: 0.625rem 1rem 0.625rem 1rem;
    margin-top: 1.25rem;
    border-radius: 0.5rem;
    background-color: var(--color-twitter);
`

const ImageUrlBoxInput = styled.input`
    flex: 1 1 0%;
    padding: 0.5rem;
    color: white;
    border: 0;
    outline: none;
    background-color: transparent;

    ::placeholder {
        color: white;
    }
`

const ImageUrlBoxButton = styled.button`
    font-weight: 700;
    color: white;
    border: 0;
    outline: none;
    background-color: transparent;
`

const ImageUrlBoxWrapper = styled.div`
    margin-top: 2.5rem;
    position: relative;
    height: 10rem;
    width: 100%;
    overflow: hidden;
    border-radius: 0.75rem;
    box-shadow: 0 0.625rem 0.9375rem -0.1875rem rgb(0 0 0 / 0.1),
        0 0.25rem 0.375rem -0.25rem rgb(0 0 0 / 0.1);
`

const ImageUrlBox = styled(Image)``
