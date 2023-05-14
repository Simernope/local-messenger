import React, {FC, useEffect} from "react";
import styles from '../Doc.module.scss'

interface DocArticlesProps {
    activeArticle: string
    setActiveArticle: React.Dispatch<React.SetStateAction<string>>
}

const DocArticles: FC<DocArticlesProps> = ({activeArticle, setActiveArticle}) => {

    useEffect(() => {

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.target.id !== activeArticle && entry.isIntersecting) {
                    setActiveArticle(entry.target.id);
                    console.log(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersection)
        const articles = document.querySelectorAll('div')
        if (articles) {
            articles.forEach((article) =>
                observer.observe(article)
            )
        }
        return () => observer.disconnect()
    }, [])

    return (
        <div className={styles.doc}>
            <div id={'overview'}>
                <h1 className="display-6">Обзор</h1>

                <p className="h6">Техническое задание на создание веб-приложения - локального чата</p>

                <p>Цели проекта</p>
                <ul>
                    <li>
                        Создать веб-приложение, позволяющее пользователям общаться друг с другом в локальной сети
                        без необходимости
                        использовать сервер.
                    </li>
                    <li>Пользователь должен иметь возможность войти в комнату чата, выбрав уникальное имя
                        пользователя и имя комнаты чата, а также отправлять сообщения, которые должны сохраняться
                        локально и не
                        удаляться при закрытии браузера.
                    </li>
                    <li> Приложение должно быть написано на React, и работоспособно в последней
                        версии Google Chrome.
                    </li>
                </ul>


                <p className={'my-2'}>Функциональные требования</p>
                <ul>
                    <li> Приложение должно обеспечивать функциональность локального чата в рамках одного браузера.
                    </li>
                    <li> У каждой вкладки должна быть своя сессия, что позволяет пользователям одновременно
                        использовать чат в разных вкладках браузера.
                    </li>
                    <li> При входе в чат пользователь должен указать уникальное имя пользователя и имя комнаты чата,
                        которые должны быть проверены на уникальность.
                    </li>
                    <li> Данные чата, включая историю сообщений, должны сохраняться и восстанавливаться при входе
                        пользователя в комнату.
                    </li>
                    <li> Пользователь должен иметь возможность отправлять текстовые сообщения, включая использование
                        emoji, цитирование сообщений, а также отправлять медиа-контент.
                    </li>
                </ul>
                <p className={'my-2'}>Нефункциональные требования</p>
                <ul>
                    <li> Приложение должно быть написано на React.
                    </li>
                    <li> Используемый язык программирования должен быть JS или TS.
                    </li>
                    <li> Приложение должно работать в последней версии Google Chrome.
                    </li>
                    <li> Зависимости приложения не должны храниться в проекте.
                    </li>
                    <li>Проект должен запускаться и работать после выполнения команд npm install и npm run start,
                        или
                        присутствовать инструкция для запуска.
                    </li>

                </ul>


                <p> Дополнительные требования</p>
                <ul>
                    <li> Приложение должно поддерживать отображение emoji.
                    </li>
                    <li> Приложение должно поддерживать возможность цитирования сообщений.
                    </li>
                    <li> Приложение должно поддерживать отправку и просмотр медиа-контента, такого как изображения и
                        видео.
                    </li>
                </ul>

                <p>Все требования выполнены</p>
                <p className={'h6 d-flex align-items-center'}>
                    <input type={'checkbox'} className={'form-check-input mx-2'} checked disabled/>Отображение
                    emoji
                </p>
                <p className={'h6 d-flex align-items-center'}>
                    <input type={'checkbox'} className={'form-check-input mx-2'} checked disabled/>Медиаконтент
                    (фото)
                </p>
                <p className={'h6 d-flex align-items-center'}>

                    <input type={'checkbox'} className={'form-check-input mx-2'} checked disabled/>Пересылка
                    сообщений
                </p>
                <p className={'h6 d-flex align-items-center'}>
                    <input type={'checkbox'}
                           className={'form-check-input mx-2'} checked
                           disabled/>
                    Переход между чатами внутри страницы
                </p>
            </div>
            <div id={'tech'}>
                <h1 className="display-6 ">Технологии</h1>
                <p>Проект написан на React и Typescript</p>
                <p>Хранилищем для чата выстпает localstorage</p>
                <p>В качестве стилей используется Bootstrap 5</p>
                <p>Для перехода на цитируемые сообщения и якорного меню используется библиотека
                    <mark>"react-router-hash-link": "^2.4.3"</mark></p>
                <p>Для добавления эмодзи используется библиотека <mark>"emoji-picker-react": "^4.4.9"</mark></p>
                <p>Для роутинга используется библиотека <mark>"react-router-dom": "^6.11.0"</mark></p>
            </div>
            <div id={'structure'}>
                <h1 className="display-6 ">Структура проекта</h1>
                <p>В приложении есть 2 страницы:
                    <mark> MainPage</mark>
                    и <mark>ChatPage</mark> (директория pages)
                </p>
                <p>В директории components хранятся директории с компонентами </p>
                <p>В каждой директории с компонентами два файла первый - с расширением .tsx, второй - scss файл
                    .module.scss</p>
                <p>Для взамодействия с localstorage есть директория localstorage c файлом .ts, там собраны все методы
                    для взаимодействия с хранилещем</p>
                <p>В директории types есть файл <mark>types.ts</mark>, в котором определны все поля для работы чата</p>
            </div>
            <div id={'logic'}>
                <h1 className="display-6 ">Логика работы</h1>
                <p>При первоначальном рендеринге пользователь попадает на MainPage, где сразу же открывается модальное
                    окно с предложением войти в комнату (чат)</p>
                <p>После заполнения полей, при правильной валидации, пользователь направляется на страницу чата</p>
                <p>Страница чата состоит из двух частей: 1. Список доступных пользователю чатов 2. Сам чат</p>
                <ul>
                    <li>Список доступных чатов</li>
                    <li>Чат</li>
                    <ul>
                        <li>
                            Компонент
                            <mark>Chat</mark>
                            принимает два свойства,
                            <mark>chatId</mark>
                            и <mark>userID</mark>.
                            <p className={'my-2'}>
                                Компонент содержит несколько переменных состояния, в том
                                числе <mark>chat</mark>, <mark>repliedMessage</mark>,
                                <mark>message</mark>, <mark>emojis</mark> и <mark>isOpenEmojiPanel</mark>, которые все
                                инициализируются с помощью хука
                                <mark>useState</mark>. Он
                                также содержит хук useRef под названием <mark>messagesEndRef</mark>, который
                                используется для ссылки
                                на
                                последнее сообщение в чате, чтобы компонент мог прокрутиться до конца чата при
                                добавлении
                                нового сообщения.
                            </p>

                            <p>
                                Компонент Chat также содержит несколько функций
                                Функция scrollToBottom вызывается каждый раз, когда в чат добавляется новое
                                сообщение, чтобы убедиться, что чат прокручивается вниз. Функция handleEmojis
                                используется
                                для обработки выбора эмодзи и обновляет переменную состояния emojis выбранным эмодзи.
                                Функция openEmojiPanel используется для переключения переменной состояния
                                isOpenEmojiPanel и
                                отображения или скрытия выбора эмодзи.
                            </p>

                            <p>
                                Компонент содержит три хука useEffect, которые используются для выполнения различных
                                действий при монтировании или обновлении компонента. Первый хук useEffect используется
                                для
                                получения данных чата из локального хранилища при монтировании компонента. Второй хук
                                useEffect используется для обновления данных чата в локальном хранилище при добавлении
                                нового сообщения в чат. Третий хук useEffect используется для того, чтобы убедиться, что
                                чат
                                всегда прокручивается вниз при добавлении нового сообщения в чат или обновлении данных
                                чата.
                            </p>
                            <ul>
                                <li>
                                    Компонент Message
                                </li>

                                <p className={'my-2'}>
                                    Компонент <mark>Message</mark> - компонент, который отображает одно сообщение
                                    в чате. Он получает следующие пропсы:
                                </p>

                                <ul>
                                    <li>
                                        <mark>isMessageMine (boolean):</mark>
                                        указывает, было ли сообщение отправлено текущим
                                        пользователем или нет.
                                    </li>

                                    <li>
                                        <mark>getRepliedMessage</mark>
                                        функция, которая устанавливает сообщение, на которое пользователь отвечает.
                                    </li>

                                    <li>
                                        <mark>message (IMessage):</mark>
                                        объект сообщения для отображения.
                                    </li>

                                </ul>
                                <p className={'my-2'}>Компонент <mark>Message</mark> использует хук useState для
                                    отслеживания того,
                                    наведена ли
                                    мышь на
                                    сообщение. Если это так, он отображает кнопку "ответить", которая устанавливает
                                    ответное сообщение при нажатии.
                                </p>
                                <p>
                                    Компонент условно отображает разные части сообщения в зависимости от свойства
                                    <mark>messageType</mark>
                                    объекта сообщения. Если сообщение является специализированным
                                    (например,
                                    пользователь присоединяется к чату), он отображает для него определенный макет.
                                    Если
                                    сообщение было перенаправлено, он отображает предыдущее сообщение и текущее
                                    сообщение. Если сообщение является обычным сообщением или медиасообщением, он
                                    отображает текст сообщения или медиа соответственно.
                                </p>


                            </ul>
                        </li>
                    </ul>
                </ul>
            </div>


            <div id={'localstorage'}>
                <h1 className="display-6 ">LocalStorage</h1>
                <p>Файл localstorage.ts содержит несколько функций для работы с чатом, используя localStorage и
                    sessionStorage. Все
                    функции экспортируются и могут быть использованы в других модулях.</p>

                <p>
                    <mark>setSessionName(sessionName: string): void</mark>
                    Функция сохраняет имя пользователя в sessionStorage в формате JSON.
                </p>
                <p>
                    <mark>{` getSessionName(): Promise
                <string
                | undefined>`}</mark>
                    Функция возвращает имя пользователя, сохраненное в sessionStorage.
                </p>
                <p>
                    <mark>{`  getChatByChatId(chatId: string): Promise<IChat | undefined>`}</mark>
                    Функция возвращает объект IChat, соответствующий заданному chatId, сохраненному в localStorage.
                </p>
                <p>
                    <mark> setNewChat(modalData: IModalData): void</mark>
                    Функция создает новый чат и сохраняет его в localStorage. Для этого используется объект IModalData,
                    который содержит chatId и информацию о пользователе, создающем чат.
                </p>
                <p>
                    <mark> setSpecialMessage(user: IUser, chatId: string): void</mark>
                    Функция создает и сохраняет в localStorage специальное сообщение, уведомляющее о создании нового
                    чата.
                    Сообщение содержит информацию о пользователе, создавшем чат, и chatId.
                </p>
                <p>
                    <mark> setNewMessage(messageData: IMessage, chatId: string): void</mark>
                    Функция добавляет новое сообщение в чат, заданный chatId. Для этого используется объект IMessage,
                    содержащий информацию о новом сообщении.
                </p>
                <p>
                    <mark> setNewChatTitle(newChatTitle: string, chatId: string): void</mark>
                    Функция изменяет название чата, заданного chatId, на новое название newChatTitle.
                </p>
                <p>
                    <mark>
                        setChatWithNewData(chat: IChat): void
                    </mark>
                    Функция сохраняет в localStorage объект IChat с обновленными данными.
                </p>
                <p>
                    <mark> setNewUserToChat(user: IUser, chatId: string): void</mark>
                    Функция добавляет нового пользователя, заданного объектом IUser, в чат, заданный chatId.
                </p>

                <p>
                    <mark>{` getChatsList(): Promise<IUsersAndTheirChats | undefined>`}</mark>
                    Функция возвращает список всех чатов и пользователей, сохраненных в localStorage.
                </p>
                <p>
                    <mark>{` getAvailableChatsToUserById(userId: string): Promise<IAvailableChatsToUser | undefined>`}</mark>
                    Функция возвращает список чатов, доступных заданному пользователю, заданному userId.
                </p>
                <p>
                    <mark>setAvailableChatToUser(modalData: IModalData): void</mark>
                    Функция добавляет новый чат, заданный chatId, к списку доступных чатов пользователя, заданного
                    объектом
                    IUser, в localStorage. Если пользователь еще не сохранен в localStorage, то функция создает новый
                    объект
                    IUsersAndTheirChats и сохраняет его в localStorage.
                </p>


            </div>


        </div>
    )
}

export default DocArticles