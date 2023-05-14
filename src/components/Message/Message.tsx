import React, {FC, useState} from "react";
import styles from './Message.module.scss'
import {IMessage} from "../../types/types";
import {HashLink} from 'react-router-hash-link'

interface MessageProps {
    isMessageMine: boolean
    getRepliedMessage: React.Dispatch<React.SetStateAction<IMessage | undefined>>
    message: IMessage
}

const Message: FC<MessageProps> = ({isMessageMine, message, getRepliedMessage}) => {
    const [isMessageHovering, setIsMessageHovering] = useState(false)

    return (
        message &&
        <>
            {
                message.imageData?.file?.name &&
                <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(message.imageData?.file)}
                />
            }
            {
                message.messageType === 'specialized' &&
                <div className={styles.specializedMessage}>
                    <div className={`d-flex align-items-center my-2`}>
                        <div className={"col-md-2 col-sm-0"}>

                        </div>
                        <div
                            className={"col-sm-8 d-flex align-items-center justify-content-start justify-content-xl-center"}>
                            <span className={"mx-3"}><strong>{message.messageSender.name}</strong></span>
                            присоединяется к чату
                        </div>

                        <div
                            className={`${styles.specializedMessageTime} my-1  col-md-2 col-sm-4 d-flex align-items-center justify-content-end `}>
                            {new Date(message.messageTime).toLocaleString()}
                        </div>

                    </div>
                    <div className={`${styles.specializedMessageDivider}`}></div>
                </div>

            }
            {
                message.messageType !== 'specialized' &&
                <div className={"d-flex  align-items-center "}
                     onMouseEnter={() => setIsMessageHovering(true)}
                     onMouseLeave={() => setIsMessageHovering(false)}
                >
                    {
                        isMessageMine &&
                        <div className={"col-1 d-flex justify-content-end"} role="button">
                            {
                                isMessageHovering &&
                                <span className="material-symbols-outlined"
                                      onClick={() => getRepliedMessage(message)}
                                >reply</span>
                            }
                        </div>
                    }
                    <div className={`col-11 `}>
                        <div
                            className={`d-flex ${isMessageMine ? "justify-content-end" : "justify-content-start"}`}>
                            <div
                                className={`${styles.messageContainer} my-2 p-1 d-flex ${isMessageMine ? "flex-row-reverse justify-content-end" : ""} `}>
                                <div className={`${styles.circleContainer} my-1 `}>
                                    <div className={styles.circle}>
                                        {message.messageSender.name[0].toUpperCase()}
                                    </div>
                                </div>

                                <div className={`${styles.message} d-flex flex-column mx-2 `}>
                                    {
                                        message.messageType === 'forwarded' && message.messageForwarded &&

                                        <div className={`${styles.messageText} p-2`}
                                             id={message.messageId.toString()}>
                                            <HashLink
                                                to={`#${message.messageForwarded.prevMessage.messageId}`}
                                                style={{textDecoration: 'none', color: 'inherit'}}
                                                smooth
                                            >
                                                <div className={`${styles.forwardedMessage} d-flex`}>
                                                    <div className={styles.forwardedMessageLine}></div>
                                                    <div className={`${styles.forwardedMessageData} mx-2`}>
                                                        <div className={styles.forwardedMessageName}>
                                                            {message.messageForwarded.prevMessage.messageSender.name}
                                                        </div>
                                                        <div className={styles.forwardedMessageText}>
                                                            {
                                                                message.messageForwarded.prevMessage.imageData?.imageUrl ?
                                                                    <img src={message.messageForwarded.prevMessage.imageData.imageUrl}
                                                                         width={"200px"}
                                                                         alt="Картинка"/>
                                                                    :
                                                                    message.messageForwarded.prevMessage.messageText

                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </HashLink>
                                            <div className={`p-2 d-flex align-items-center `}>
                                                {message.imageData?.imageUrl ?
                                                    <img src={message.imageData.imageUrl}
                                                         width={"250px"}
                                                         alt="Картинка"/>
                                                    :
                                                    message.messageText
                                                }
                                            </div>
                                        </div>
                                    }
                                    {
                                        message.messageType === "normal" && message.messageText &&
                                        <div
                                            className={`${styles.messageText}  p-2 d-flex align-items-center  `}
                                            id={message.messageId.toString()}>
                                            {message.messageText}
                                        </div>

                                    }

                                    {
                                        message.messageType === "media" && message.imageData && message.imageData.imageUrl &&
                                        <div
                                            className={`${styles.messageText}  p-2 d-flex align-items-center  `}
                                            id={message.messageId.toString()}>
                                            <img
                                                alt="not found"
                                                width={"250px"}
                                                src={message.imageData.imageUrl}
                                            />
                                        </div>


                                    }

                                    <div
                                        className={`${styles.messageSender} px-1 d-flex align-items-center  ${isMessageMine ? "justify-content-end" : ""}`}>
                                        <div className={`${styles.name}`}>{message.messageSender.name}</div>
                                        <div
                                            className={`${styles.time}  mx-1 `}>{new Date(message.messageTime).toLocaleString()}</div>
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>
                    {
                        !isMessageMine &&
                        <div className={"col-1 "} role="button">
                            {
                                isMessageHovering &&
                                <span className="material-symbols-outlined"
                                      onClick={() => getRepliedMessage(message)}
                                >reply</span>
                            }
                        </div>


                    }
                </div>
            }


        </>

    )
}

export default Message