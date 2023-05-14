import {v4} from 'uuid'
import {
    IAvailableChatsToUser,
    IChat,
    IMessage,
    IModalData,
    IUser, IUserAvailableChat,
    IUsersAndTheirChats
} from "../types/types";

export const setSessionName = (sessionName: string): void => {
    sessionStorage.setItem('chat-login', JSON.stringify(sessionName));
}
export const getSessionName = async (): Promise<string | undefined> => {
    const response = sessionStorage.getItem('chat-login')
    if (response) {
        return await JSON.parse(response)
    }
}

export const getChatByChatId = async (chatId: string): Promise<IChat | undefined> => {
    const response = await localStorage.getItem(`chat-${chatId}`)
    if (response) {
        return await JSON.parse(response)
    }
}

export const setNewChat = (modalData: IModalData): void => {
    const chatData: IChat = {
        chatId: modalData.chatId,
        chatName: "Безымянный",
        chatUsers: [{
            userId: modalData.user.name,
            name: modalData.user.name
        }],
        messages: []
    }
    localStorage.setItem(`chat-${modalData.chatId}`, JSON.stringify(chatData));
    setSpecialMessage(modalData.user, modalData.chatId)
}

export const setSpecialMessage = (user: IUser, chatId: string): void => {
    setNewMessage({
        messageId: `chatId-${chatId}-MessageId` + v4(),
        messageText: 'string',
        messageSender: {
            userId: user.name,
            name: user.name,
        },
        messageTime: Date.now(),
        messageType: 'specialized',
    }, chatId,)
}


export const setNewMessage = (messageData: IMessage, chatId: string): void => {
    getChatByChatId(chatId)
        .then((response) => {
            if (response) {
                response.messages.push(messageData)
                setChatWithNewData(response)
            }
        })
        .then(() => window.dispatchEvent(new Event("storage")))
}

export const setNewChatTitle = (newChatTitle: string, chatId: string): void => {
    getChatByChatId(chatId)
        .then((response) => {
            if (response) {
                response.chatName = newChatTitle
                setChatWithNewData(response)
            }
        })
        .then(() => window.dispatchEvent(new Event("storage")))
}


export const setChatWithNewData = (chat: IChat): void => {
    localStorage.setItem(`chat-${chat.chatId}`, JSON.stringify(chat));
}

export const setNewUserToChat = (user: IUser, chatId: string): void => {
    getChatByChatId(chatId).then(
        (response) => {
            if (response) {
                const userIdIndexes = response.chatUsers.map((el) => el.userId)
                if (!userIdIndexes.includes(user.userId)) {
                    response.chatUsers.push(user)
                    setChatWithNewData(response)
                    setSpecialMessage(user, chatId)
                }
            }

        }
    )
}

export const getChatsList = async (): Promise<IUsersAndTheirChats | undefined> => {
    const response = await localStorage.getItem('usersAndChats')
    if (response) {
        return await JSON.parse(response)
    }
}
export const getAvailableChatsToUserById = async (userId: string): Promise<IAvailableChatsToUser | undefined> => {
    const response = await localStorage.getItem('usersAndChats')
    if (response) {
        const data = await JSON.parse(response)
        return await data.usersAndChats.find((el: IUserAvailableChat) => el.userId === userId)

    }
}
export const setAvailableChatToUser = (modalData: IModalData): void => {
    const usersAndChats: IUsersAndTheirChats = {
        usersAndChats: [
            {
                userId: modalData.user.userId,
                availableChats: [
                    {
                        chatId: modalData.chatId
                    }
                ]
            }
        ]
    }
    getChatsList().then(
        (response) => {
            if (response) {
                const index = response.usersAndChats.map(el => el.userId).indexOf(modalData.user.userId)
                if ((index && index !== -1) || index === 0) {
                    const chatIndexes = response.usersAndChats[index].availableChats.map(el => el.chatId)
                    if (!chatIndexes.includes(modalData.chatId)) {
                        response.usersAndChats[index].availableChats.push({chatId: modalData.chatId})
                        localStorage.setItem("usersAndChats", JSON.stringify(response));
                    }

                } else {
                    response.usersAndChats.push(usersAndChats.usersAndChats[0])
                    localStorage.setItem("usersAndChats", JSON.stringify(response));
                }
            } else {
                localStorage.setItem("usersAndChats", JSON.stringify(usersAndChats));
            }
        }
    )
}




