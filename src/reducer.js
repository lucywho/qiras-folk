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
        state = {
            ...state,
            chatMessages: action.lastTenChats
        };
    }

    if (action.type == "NEW_CHAT_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.newChat]
        };
    }

    return state; //keep at end
}
