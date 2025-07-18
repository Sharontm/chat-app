import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    console.log("messages", messages);

    useEffect(() => {

        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                return console.log("Error fetching users:", response);
            }

            const pChats = response.filter((u) => {

                let isChatCreated = false;
                if (user?._id === u._id) { console.log("I'm the culprit"); return false; }

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
        }

        getUsers();

    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {

                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoading(false);

                if (response.error) {
                    return setUserChatsError(response.message);
                }

                setUserChats(response);
            }
        }

        getUserChats()
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {

            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

            setIsMessagesLoading(false);

            if (response.error) {
                return setMessagesError(response);
            }

            setMessages(response);

        }

        getMessages()
    }, [currentChat]);

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("No text message to send");

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender?._id,
            text: textMessage
        }))

        if (response.error) {
            return setSendTextMessageError(response.message);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage("");
    })

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(
            `${baseUrl}/chats`,
            JSON.stringify({
                firstId,
                secondId
            })
        )

        if (response.error) {
            return console.log("Error creating chat:", response);
        }

        setUserChats((prev) => [...prev, response]);
    }, [])

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            sendTextMessage
        }}>
            {children}
        </ChatContext.Provider>
    )
}