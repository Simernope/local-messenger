import React, {FC} from "react";
import {IMessage} from "../../types/types";
import styles from './MessageReply.module.scss'

interface MessageReplyProps {
    message: IMessage
    getRepliedMessage: React.Dispatch<React.SetStateAction<IMessage | undefined>>


}

const MessageReply: FC<MessageReplyProps> = ({message, getRepliedMessage}) => {
    return (
        <div className={`${styles.messageContainer} d-flex align-items-center p-1 `}>
            <div className={"col-1 d-flex align-items-center justify-content-center"}>
                <span className="material-symbols-outlined">forward</span>
            </div>
            <div className={"col-10"}>
                <div className={styles.name}>{message.messageSender.name}</div>
                <div className={`${styles.message} p-1 d-flex`}>
                    {
                        message.messageText.length > 100 ?
                            message.messageText.slice(0, 100) : message.messageText
                    }
                </div>
            </div>
            <div className={"col-1 d-flex align-items-center justify-content-center"} role="button"
                 onClick={() => getRepliedMessage(undefined)}><span className="material-symbols-outlined">close</span>
            </div>
        </div>
    )
}

export default MessageReply