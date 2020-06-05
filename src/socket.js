import * as io from "socket.io-client";

import { lastTenChats, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("lastTenChats", lastTen =>
            store.dispatch(lastTenChats(lastTen))
        );

        socket.on("newChatMessage", newChat =>
            store.dispatch(chatMessage(newChat))
        );
    }
};
