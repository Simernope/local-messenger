export interface IChat {
    chatId: string
    chatName: string
    chatUsers: Array<IUser>
    messages: Array<IMessage | undefined>

}

interface IMessageForwarded {
    prevMessage: IMessage

}

export interface IMessage {
    messageId: string
    messageText: string
    messageSender: IUser
    messageTime: number
    messageForwarded?: IMessageForwarded
    messageType: 'normal' | 'forwarded' | 'specialized' | 'media'
    imageData? : {
        file?: File,
        imageUrl?: string
    }
}


export interface IUser {
    userId: string
    name: string
}

export interface IAvailableChat {
    chatId: string
}

export interface IUserAvailableChat {
    userId: string
    availableChats: Array<IAvailableChat>
}

export interface IUsersAndTheirChats {
    usersAndChats: Array<IUserAvailableChat>
}

export interface IAvailableChatsToUser {
    availableChats: Array<IAvailableChat>
}

export interface IModalData {
    user: IUser
    chatId: string
}

