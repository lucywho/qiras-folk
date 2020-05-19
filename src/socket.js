import * as io from "socket.io-client";

//import { chatMessages, chatMessage } from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("recentChats", lastTenChats =>
            store.dispatch(chatMessages(lastTenChats))
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
