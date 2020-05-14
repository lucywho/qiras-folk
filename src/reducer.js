export default function reducer(state = {}, action) {
    if (action.type == "PENDING_FRIENDS") {
        state = {
            ...state,
            pendingFriends: pendingFriends
        };
    }
}

// RECEIVE_FRIENDS_WANNABES: should clone the global state, and add to it a property called friendsWannabes whose value is the array of friends and wannabes

// ACCEPT_FRIEND_REQUEST: should clone the global state, and the clone should have all the properties of the old state except one of the objects in the friendsWannabes array should have their accepted property set to true. All done immutably :)

// UNFRIEND: should clone the global state, and the clone should have all the properties of the old state except the user whose friendship was ended should be removed from the friendsWannabes array. All done immutably :)
