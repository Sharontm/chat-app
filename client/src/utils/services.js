export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json();
    if (!response.ok) {
        let message
        if(data?.message){
            message = data.message;
        }
        else {
            message = data;
        }
        console.log("Error in postRequest:", message); //// change to message
        return {error: true, message}
    } 
    return data;
};

export const getRequest = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        let message = "An error occurred";
        if(data?.message){
            message = data?.message;
        }
        else {
            message = data;
        }
        console.log("Error in getRequest:", message);
        return {error: true, message}
    }
    return data;
}