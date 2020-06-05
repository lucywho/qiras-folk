import axios from "./axios";

export async function receiveFriends() {
    const response = await axios.get(`/pendingfriends`);

    return {
        type: "PENDING_FRIENDS",
        allFriends: response.data.allfriends
    };
}

export async function acceptFriendRequest(otherUserId) {
    let buttonText = "Accept Friend Request";

    const response = await axios.post(
        `/updatefriendship/${otherUserId}/${buttonText}`
    );

    return {
        type: "ACCEPT_FRIEND",
        newFriendId: response.data.newFriendId
    };
}

export async function unfriend(otherUserId) {
    let buttonText = "Unfriend";
    const response = await axios.post(
        `/updatefriendship/${otherUserId}/${buttonText}`
    );
    console.log("unfriendresp: ", response.data);

    return {
        type: "UNFRIEND",
        otherUserId
    };
}

export function lastTenChats(lastTenChats) {
    return {
        type: "LAST_TEN_CHATS",
        lastTenChats
    };
}

export function chatMessage(newChat) {
    return {
        type: "NEW_CHAT_MESSAGE",
        newChat
    };
}
