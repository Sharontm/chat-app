import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members?.find((member) => member !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if(!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
            if (response.error) {
                setError(response.error);
                return;
            }

            setRecipientUser(response);
            console.log("Recipient User:", response);
        };

        getUser();
    }, [])

    return {recipientUser};
}