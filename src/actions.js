import axios from "./axios";

export async function receiveFriends() {
    // receiveFriendsWannabes: will make GET request to server to retrieve the list of friends and wannabes

    const response = await axios.get(`/pendingfriends`);
    console.log("resp: ", response.data);

    return {
        type: "PENDING_FRIENDS",
        allFriends: response.data.allfriends
    };

    // should return an object with type property and a friendsWannabes property whose value is the array of friends and wannabes from the server
}

export async function acceptFriendRequest(otherUserId) {
    let buttonText = "Accept Friend Request";
    console.log("otherUserId", otherUserId);
    const response = await axios.post(
        `/updatefriendship/${otherUserId}/${buttonText}`
    );
    console.log("aFRresp: ", response.data);

    // acceptFriendRequest: will make POST request to the server to accept the friendship. The function should return an object with type property and the id of the user whose friendship was accepted.

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
    // unfriend: will make POST to the server to end the friendship. It should return an object with type and the id of the user whose friendship was ended.
    console.log("other user id", otherUserId);
    return {
        type: "UNFRIEND",
        otherUserId
    };
}

export function lastTenChats(lastTenChats) {
    console.log("lastTenChats in actions", lastTenChats);
    return {
        type: "LAST_TEN_CHATS",
        lastTenChats
    };
}

export function chatMessage(newMsg) {
    console.log("chatMessage in actions", newMsg);
    return {
        type: "NEW_CHAT_MESSAGE",
        newMsg
    };
}
