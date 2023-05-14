import React, {FC, useEffect, useRef, useState} from "react";
import {IChat, IMessage} from "../../types/types";
import styles from './Chat.module.scss'
import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import MessageReply from "../MessageReply/MessageReply";
import {getChatByChatId, setNewMessage} from "../../localstorage/localstorage";
import ChatHeader from "../ChatHeader/ChatHeader";
import EmojiPicker from "emoji-picker-react";

interface ChatProps {
    chatId: string
    userId: string
}

const Chat: FC<ChatProps> = ({chatId, userId}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [chat, setChat] = useState<IChat>()
    const [repliedMessage, setRepliedMessage] = useState<IMessage>()
    const [message, setMessage] = useState<IMessage>()
    const [emojis, setEmojis] = useState<string>()
    const [isOpenEmojiPanel, setIsOpenEmojiPanel] = useState<boolean>(false)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const handleEmojis = (emoji: string) => {
        setEmojis(emoji)
    }
    const openEmojiPanel = () => {
        setIsOpenEmojiPanel(!isOpenEmojiPanel)
    }
    useEffect(() => {
        getChatByChatId(chatId).then(
            (response) => {
                if (response) {
                    setChat(response)
                }
            }
        )
    }, [chatId])

    useEffect(() => {
        console.log('message', message)
        if (message) {
            if (chatId === message.messageId.split('-')[1]) {
                setNewMessage(message, chatId)
                setRepliedMessage(undefined)

            }
            setMessage(undefined)
        }
    }, [message, chatId])

    useEffect(() => {
        console.log('smooth')
        scrollToBottom()
    }, [message, repliedMessage, chat])
    useEffect(() => {
        window.addEventListener("storage",
            () => {
                getChatByChatId(chatId).then(
                    (response) => {
                        if (response) {
                            setChat(response)
                        }
                    })
            })
    }, [chatId])

    console.log(isOpenEmojiPanel)
    return (
        <div className={`position-relative`}>
            {
                chat &&
                <div className={styles.chatContainer}>
                    <div className={`${styles.chatHeader} d-flex p-2 align-items-center`}>
                        <ChatHeader chat={chat}/>

                    </div>
                    <div className={`${styles.messagesContainer}`}>
                        {
                            chat.messages && chat.messages.map((message) =>
                                (
                                    message &&
                                    <Message isMessageMine={userId === message?.messageSender.userId}
                                             message={message}
                                             getRepliedMessage={setRepliedMessage} key={message?.messageId}/>
                                )
                            )
                        }
                        {
                            isOpenEmojiPanel &&
                            <div className={`bottom-0 start-0 position-absolute ${styles.emojiPanel} ${repliedMessage && styles.emojiPanelWithReplied}`}>
                                <EmojiPicker onEmojiClick={(emoji) => handleEmojis(emoji.emoji)} height={"350px"} width={"350px"}/>
                            </div>
                        }

                        <div ref={messagesEndRef}></div>
                    </div>

                    {
                        repliedMessage &&
                        <MessageReply message={repliedMessage} getRepliedMessage={setRepliedMessage}/>
                    }

                    <MessageInput getMessage={setMessage} userId={userId} forwardedMessage={repliedMessage}
                                  chatId={chatId} emojis={emojis} openEmojiPanel={openEmojiPanel} setIsOpenEmojiPanel={setIsOpenEmojiPanel}/>
                </div>
            }

        </div>

    )
}

export default Chat