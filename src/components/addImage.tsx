import type React from 'react'
import type { MutableRefObject, ReactElement, SetStateAction } from 'react'

interface Props {
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    setImage: React.Dispatch<SetStateAction<string>>
    setImageUrlBoxIsOpen: React.Dispatch<SetStateAction<boolean>>
    imageInputRef: MutableRefObject<HTMLInputElement>
}

const addImage = ({
    e,
    setImage,
    setImageUrlBoxIsOpen,
    imageInputRef,
}: // @ts-ignore
Props): ReactElement => {
    e.preventDefault()

    // @ts-ignore
    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxIsOpen(false)
}

export default addImage
