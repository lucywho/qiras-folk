export default function reducer(state = {}, action) {
    if (action.type == "PENDING_FRIENDS") {
        state = {
            ...state,
            allFriends: action.allFriends
        };
    }

    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            allFriends: state.allFriends.map(item => {
                if (item.id == newFriendId) {
                    item.accepted = true;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        console.log("state", state);
        // state = {
        //     ...state,
        //     allFriends: action.allFriends.filter(allFriends => allFriends.otherUserId !action.otherUserId

        //     )
    }
    return state;
}

// allFriends = accepted and pending friend requests
// friends = accepted friend requests

// RECEIVE_FRIENDS_WANNABES: should clone the global state, and add to it a property called friendsWannabes whose value is the array of friends and wannabes

// ACCEPT_FRIEND_REQUEST: should clone the global state, and the clone should have all the properties of the old state except one of the objects in the friendsWannabes array should have their accepted property set to true. All done immutably :)

// UNFRIEND: should clone the global state, and the clone should have all the properties of the old state except the user whose friendship was ended should be removed from the friendsWannabes array. All done immutably :)
