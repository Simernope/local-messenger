import React, {FC, useState} from "react";
import styles from "../Chat/Chat.module.scss";
import {Link} from "react-router-dom";
import {IChat} from "../../types/types";
import {setNewChatTitle} from "../../localstorage/localstorage";

interface ChatHeaderProps {
    chat: IChat
}

const ChatHeader: FC<ChatHeaderProps> = ({chat}) => {
    const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>("")
    const handleNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }

    const updateNewTitle = () => {
        setNewChatTitle(newTitle, chat.chatId)
        setIsTitleEditing(false)
    }

    const getUsersPluralForm = (number: number): string => {
        if ((number % 10 === 1) && (number !== 11)) {
            return `${number} участник`
        }
        if ((number >= 5 ) && (number <= 19)){
            return `${number}  участников`
        }
        if ((number % 10) === 2 || 3 || 4) {
            return `${number}  участника`
        }
        return `${number}  участников`
    }

    return (
        <>
            {
                isTitleEditing ?
                    <div className="input-group">
                        <input type="text" className="form-control"
                               value={newTitle}
                               onChange={handleNewTitle}/>
                        <span className="input-group-text" role="button">
                            <span className="material-symbols-outlined" onClick={() => setIsTitleEditing(false)}>
                                close
                            </span>

                        </span>
                        <span className="input-group-text" role="button">
                            <span className="material-symbols-outlined" onClick={updateNewTitle}>
                                check
                            </span>
                        </span>

                    </div>
                    :
                    <>
                        <div className={`${styles.toAllChatLink} col-lg-4 col-sm-5 col-xs-5`}>
                            <Link to={"/"} className={`${styles.linkStyles} d-flex align-items-center`}>
                                <span className="material-symbols-outlined">arrow_back_ios</span>
                                На главную страницу
                            </Link>
                        </div>

                        <div
                            className={`${styles.chatTitle}  col col-sm-6 col-lg-4 d-flex align-items-start justify-content-center`}>

                            <div className={`align-items-center justify-content-center`}>

                                <div
                                    className={`${styles.title} text-center`}>{chat.chatName} # {chat.chatId}</div>
                                <div className={`${styles.users} text-center`}
                                     role="button">{getUsersPluralForm(chat.chatUsers.length)}
                                </div>
                            </div>
                            <span className="material-symbols-outlined mx-1" role="button"
                                  onClick={() => setIsTitleEditing(true)}>
                                                    edit
                                                </span>

                        </div>

                    </>
            }
        </>
    )
}

export default ChatHeader