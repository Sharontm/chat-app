import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Stack } from 'react-bootstrap';
import UserChat from "../components/chat/UserChat";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);

    console.log("User Chats:", userChats);

    return (
        <Container>
            {userChats?.length < 1 ? null : 
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="flex-grow-0 messages-box pe-3" gap={3}>
                        {isUserChatsLoading ? <p>Loading chats...</p> : null}
                        
                        {userChats?.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                            )
                        })}
                    </Stack>
                    <p>Chatbox</p>
                </Stack>}
        </Container>);
}

export default Chat;