import {FC} from "react";
import styles from './ChatsList.module.scss'
import {IAvailableChatsToUser} from "../../types/types";
import {Link} from "react-router-dom";

interface ChatsListProps {
    availableChats: IAvailableChatsToUser
    currentChat: string
}

const ChatsList: FC<ChatsListProps> = ({availableChats, currentChat}) => {
    const getChatsPluralForm = (number: number): string => {
        if ((number % 10 === 1) && (number !== 11)) {
            return `${number} чате`
        }else {
            return `${number} чатах`
        }
    }
    return (
        <div className={"d-flex flex-column"}>
            <div className={styles.title}>
                Мои авторизованные чаты
            </div>
            {
                availableChats &&
                <>
                    <div className={styles.description}>
                        Вы авторизованы в {getChatsPluralForm(availableChats.availableChats.length)}
                    </div>
                    <ul className="list-group">
                        {
                            availableChats.availableChats.map((chat) =>
                                <Link to={`/chat/${chat.chatId}`} className={styles.link} key={chat.chatId}>
                                    <li className={`list-group-item ${currentChat === chat.chatId && 'active bg-primary-subtle text-primary'} `}
                                        aria-current={currentChat === chat.chatId}>ID #<strong>{chat.chatId}</strong></li>
                                </Link>
                            )
                        }

                    </ul>
                </>
            }

        </div>

    )
}

export default ChatsList