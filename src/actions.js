import axios from "./axios";

export function receiveFriends(pendingFriends) {
    // receiveFriendsWannabes: will make GET request to server to retrieve the list of friends and wannabes

    axios
        .get(`/pendingfriends`)
        .then(response => {
            console.log("get friends response.data:", response.data);
            return {
                type: "PENDING_FRIENDS",
                pendingFriends: response.data.users
                //check name of data
            };
        })
        .catch(err => {
            console.log("catch error in receivefriends", err);
        });

    // should return an object with type property and a friendsWannabes property whose value is the array of friends and wannabes from the server
}

export function acceptFriendRequest(acceptfriend) {
    // acceptFriendRequest: will make POST request to the server to accept the friendship. The function should return an object with type property and the id of the user whose friendship was accepted.

    return {
        type: "ACCEPT_FRIEND"
        //something
    };
}

export function unfriend(unfriend) {
    // unfriend: will make POST to the server to end the friendship. It should return an object with type and the id of the user whose friendship was ended.

    return {
        type: "UNFRIEND"
        //something
    };
}
