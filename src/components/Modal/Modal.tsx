import React, {FC, useEffect, useState} from "react";
import styles from './Modal.module.scss'
import {
    getChatByChatId,
    getSessionName, setAvailableChatToUser,
    setNewChat, setNewUserToChat,
    setSessionName
} from "../../localstorage/localstorage";
import {IModalData} from "../../types/types";
import {useNavigate} from "react-router-dom";

interface ModalProps {
    isActive: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: FC<ModalProps> = ({isActive, setIsModalOpen}) => {
    const [isModalActive, setIsModalActive] = useState<boolean>(isActive)
    const [login, setLogin] = useState<string>("")
    const [chatId, setChatId] = useState<number>(1)
    const [modalData, setModalData] = useState<IModalData>()
    const [tooltipLoginError, setTooltipLoginError] = useState<string>()
    const [tooltipChatIdError, setTooltipChatIdError] = useState<string>()
    const [tooltipLoginOk, setTooltipLoginOk] = useState<string>()
    const [tooltipChatIdOk, setTooltipChatIdOk] = useState<string>()

    const navigate = useNavigate()

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTooltipLoginError(undefined)
        setTooltipLoginOk('Отличный логин!')
        setLogin(e.target.value)
    }
    const handleChatId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTooltipChatIdError(undefined)
        setTooltipChatIdOk(undefined)
        if (isNaN(Number(e.target.value))) {
            setTooltipChatIdError(
                "ID чата должно быть числовым значением!")
        } else {
            setChatId(parseInt(e.target.value))
        }
    }

    const findChat = () => {
        console.log(chatId, login)
        if (chatId && login) {
            setModalData({chatId: String(chatId), user: {userId: login, name: login}})
            setSessionName(login)
            getChatByChatId(String(chatId))
                .then(
                    response => {
                        console.log(response)
                        if (response) {
                            setTooltipChatIdOk(`Чат с Id ${response.chatId} под названием "${response.chatName}" найден!`)
                            setTooltipLoginOk('Отличный логин!')
                        } else {
                            setTooltipChatIdError('Чат с таким ID не найден! Вы можете создать его')
                        }
                    }
                )
                .catch(err => console.log(err))
        }

    }

    const enterChat = () => {
        if (modalData) {
            setAvailableChatToUser(modalData)
            setNewUserToChat({userId: login, name: login}, String(chatId))
            navigate(`/chat/${chatId}`)
            resetModalData()
        }
    }

    const resetModalData = () => {
        setTooltipChatIdError(undefined)
        setTooltipLoginError(undefined)
        setTooltipChatIdOk(undefined)
        setTooltipLoginOk(undefined)
        setIsModalActive(false)
        setIsModalOpen(false)
        setModalData(undefined)
    }

    const createChat = () => {
        if (modalData) {
            setNewChat(modalData)
            setAvailableChatToUser(modalData)
            navigate(`/chat/${chatId}`)
            resetModalData()
        }
    }

    useEffect(() => {
        setIsModalActive(isActive)
        getSessionName().then(
            (response) => {
                if (response) {
                    setLogin(response)
                }
            }
        )
    }, [isActive])
    return (
        <div
            className={`${styles.modalWindow} modal ${isModalActive ? `d-flex justify-content-center align-items-center` : 'd-none'} `}>
            <div className="modal-dialog my-0">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Добро пожаловать в локальный чат!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    setIsModalActive(false);
                                    setIsModalOpen(false)
                                }}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label">Логин (Имя или никнейм для
                                    авторизации):</label>
                                <input type="text"
                                       className={`${tooltipLoginOk && "is-valid"} ${tooltipLoginError && "is-invalid"}  form-control `}
                                       id="login"
                                       placeholder="Логин"
                                       value={login}
                                       onChange={handleLogin}/>
                                {
                                    tooltipLoginOk ?
                                        <div className="valid-feedback d-block">
                                            {tooltipLoginOk}
                                        </div>
                                        :
                                        tooltipLoginError &&
                                        <div className="invalid-feedback d-block">
                                            {tooltipLoginError}
                                        </div>

                                }


                            </div>

                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label"> Номер комнаты (ID
                                    чата):</label>
                                <input type="text"
                                       className={`${tooltipChatIdOk && "is-valid"} ${tooltipChatIdError && "is-invalid"} form-control `}
                                       id="chat-name"
                                       placeholder="ID чата"
                                       onChange={handleChatId}/>
                                {
                                    tooltipChatIdOk ?
                                        <div className="valid-feedback d-block">
                                            {tooltipChatIdOk}
                                        </div>
                                        :
                                        tooltipChatIdError &&
                                        <div className="invalid-feedback d-block">
                                            {tooltipChatIdError}
                                        </div>

                                }

                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={() => {
                                    setIsModalActive(false);
                                    setIsModalOpen(false)
                                }}>Закрыть
                        </button>

                        {
                            tooltipChatIdError ?
                                <button type="button" className="btn btn-primary" onClick={createChat}>
                                    Создать чат
                                </button>
                                :
                                tooltipChatIdOk ?
                                    <button type="button" className="btn btn-primary" onClick={enterChat}>Войти
                                        в комнату
                                    </button>
                                    :
                                    <button type="button" className="btn btn-primary" onClick={findChat}>
                                        Найти чат!
                                    </button>
                        }


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal