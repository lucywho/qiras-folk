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
                if (item.id == action.newFriendId) {
                    return { ...item, accepted: true };
                } else {
                    return item;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        console.log("state", state);
        state = {
            ...state,
            allFriends: state.allFriends.filter(
                friend => friend.id != action.otherUserId
            )
        };
    }

    if (action.type == "LAST_TEN_CHATS") {
        console.log("LTC state", state);
        state = {
            ...state,
            chatMessages: action.lastTenChats
        };
        console.log("LTC state 2", state);
        console.log("LTC chat messages", state.chatMessages);
    }

    return state; //keep at end
}
