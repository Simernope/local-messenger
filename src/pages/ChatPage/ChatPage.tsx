import {useLocation} from "react-router-dom";
import styles from './ChatPage.module.scss'
import ChatsList from "../../components/ChatsList/ChatsList";
import Chat from "../../components/Chat/Chat";
import React, {useEffect, useState} from "react";
import {
    getChatByChatId,
    getAvailableChatsToUserById,
    getSessionName
} from "../../localstorage/localstorage";
import {IAvailableChatsToUser} from "../../types/types";
import Modal from "../../components/Modal/Modal";

const ChatPage = () => {
    const [chatsList, setChatsList] = useState<IAvailableChatsToUser>()
    const [chatId, setChatId] = useState<string>()
    const [userId, setUserId] = useState<string>()
    const location = useLocation()
    const [isModalActive, setIsModalActive] = useState<boolean>(false)



    useEffect(() => {
        const pathnameArr = location.pathname.split("/")
        const chatId = pathnameArr[pathnameArr.length - 1]

        getChatByChatId(chatId).then(
            (response) => {
                if (response) {
                    console.log('render 1')
                    setChatId(response.chatId)
                }
            }
        )
    }, [location])
    useEffect(() => {
        getSessionName().then(
            (response) => {
                if (response) {
                    console.log('render 2')
                    setUserId(response)
                }
            }
        )
    }, [location])

    useEffect(() => {
        if (userId) {
            getAvailableChatsToUserById(userId).then(
                (response) => {
                    if (response) {
                        setChatsList(response)
                        console.log('render 3')
                    }
                }
            )
        }

    }, [chatId, userId])
    console.log('render')
    return (
        <>
            <Modal isActive={isModalActive} setIsModalOpen={setIsModalActive}/>
            <div className={`container ${styles.container}`}>
                {
                    chatId && userId ?
                        chatsList && chatId &&
                        <div className={"row"}>
                            <div className={"col-md-3 col-12 my-2"}>
                                {

                                    <ChatsList availableChats={chatsList} currentChat={chatId}/>
                                }

                                <button type="button"
                                        className="btn btn-outline-primary my-3 d-flex align-items-center justify-content-center w-100"
                                        onClick={() => setIsModalActive(true)}
                                >
                                    Войти в новый чат
                                </button>
                            </div>
                            <div className={"col-md-9 col-12 my-2"}>

                                <Chat chatId={chatId} userId={userId}/>

                            </div>
                        </div>

                        :
                        <>Похоже, что вы не авторизировались! у вас нет прав на просмотр этого чата!
                            <button type="button"
                                    className="btn btn-primary my-3 d-flex align-items-center justify-content-center "
                                    onClick={() => setIsModalActive(true)}
                            >Авторизироваться и войти</button>
                        </>

                }
            </div>
        </>

    )
}

export default ChatPage