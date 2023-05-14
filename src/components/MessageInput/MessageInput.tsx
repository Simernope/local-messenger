import React, {FC, useEffect, useRef, useState} from "react";
import {IMessage} from "../../types/types";
import {v4} from 'uuid';

interface MessageInputProps {
    getMessage: React.Dispatch<React.SetStateAction<IMessage | undefined>>
    userId: string
    forwardedMessage: IMessage | undefined
    chatId: string
    emojis: string | undefined
    openEmojiPanel():void
    setIsOpenEmojiPanel: React.Dispatch<React.SetStateAction<boolean>>

}

const MessageInput: FC<MessageInputProps> = ({getMessage, userId, forwardedMessage, chatId, emojis, openEmojiPanel, setIsOpenEmojiPanel}) => {
    const [message, setMessage] = useState<string>("")
    const [file, setFile] = useState<File>()
    const [imageUrl, setImageUrl] = useState<string>()
    const filePicker = useRef<HTMLInputElement>(null)


    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFile(undefined)
        setMessage(e.target.value)
    }

    const handlePickFile = (): void => {
        if (filePicker && filePicker.current) {
            filePicker.current.click()
        }
    }
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            console.log(e.target.files[0])
            setMessage(e.target.files[0].name)
            setFile(e.target.files[0])
        }
    }

    const rollbackFile = () => {
        setFile(undefined)
        setImageUrl(undefined)
        setMessage("")
    }


    const sendMessage = (): void => {
        if (message !== "") {
            getMessage({
                messageId: `chatId-${chatId}-MessageId` + v4(),
                messageText: message,
                messageSender: {
                    userId: userId,
                    name: userId

                },
                messageTime: Date.now(),
                messageForwarded: forwardedMessage ? {
                    prevMessage: forwardedMessage
                } : undefined,
                messageType: forwardedMessage ? 'forwarded' : file ? 'media' : 'normal',
                imageData: {
                    file: file,
                    imageUrl: imageUrl
                }
            })
            setMessage("")
            setFile(undefined)
            setImageUrl(undefined)
            setIsOpenEmojiPanel(false)
        }
    }

    useEffect(() => {
        if (emojis){
            setMessage(message + emojis)
        }
    }, [emojis])

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                // @ts-ignore
                const {result} = e.target;
                if (result && !isCancel) {
                    setImageUrl(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
    }, [file])

    return (
        <>
            <div className={`d-flex flex-column`}>

                <div className="input-group ">
                <span className="input-group-text" role="button" onClick={openEmojiPanel}>
                    <span className="material-symbols-outlined">
                        add_reaction
                    </span>
                </span>
                    <input type="text" className="form-control" placeholder="Введите сообщение"
                           aria-label="Message" aria-describedby="button-addon2" onChange={handleMessage}
                           value={message}
                           disabled={!!file}
                           readOnly={!!file}
                    />

                    {
                        file &&
                        <span className="input-group-text" role="button" onClick={rollbackFile}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </span>
                    }

                    {
                        message ?
                            <button className="btn btn-primary" type="button" id="button-addon2"
                                    onClick={sendMessage}>Отправить</button>
                            :
                            <span className="input-group-text" role="button" onClick={handlePickFile}>
                        <label htmlFor="upload-file">
                            <span className="material-symbols-outlined" role="button">
                                attach_file
                             </span>
                         </label>
                         <input type="file" className="d-none" ref={filePicker} accept="image/*, .png, .jpg"
                                onChange={handleFile}/>
                    </span>
                    }

                </div>

            </div>
        </>


    )
}

export default MessageInput