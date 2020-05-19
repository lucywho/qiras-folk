import * as io from "socket.io-client";

import { lastTenChats } from "./actions";
//note: add name of exprt function for new chats when written

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("lastTenChats", lastTen =>
            store.dispatch(lastTenChats(lastTen))
        );

        // socket.on(
        //     'chatMessage',
        //     msg => store.dispatch(
        //         chatMessage(msg)
        //     )
        // );

        socket.on("addChatMsg", msg => {
            console.log(
                `new message arrives in the client ready for redux process: ${msg}`
            );
        });
    }
};
