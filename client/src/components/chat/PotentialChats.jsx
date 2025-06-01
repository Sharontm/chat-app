import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const PotentialChats = () => {

    const { potentialChats } = useContext(ChatContext);

    console.log("Potential Chats:", potentialChats);

    return (
        <>
            <div className="all-users">
                {potentialChats && potentialChats.map((u, index) => {
                    return (<div className="single-user" key={index}>
                        {u.name}
                        <span className="user-online"></span>
                    </div>)
                })}
            </div>
        </>
    )
}

export default PotentialChats
