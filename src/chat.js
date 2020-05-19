import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { lastTenChats } from "./actions";

export default function Chat() {
    const elemRef = useRef();
    const chatMessage = useSelector(state => state && state.chatMessages);
    const lastTen = useSelector(state => state && state.lastTenChats);
    console.log("state in chat.js", state);
    console.log("lastTen in chat.js", lastTen);

    useEffect(() => {
        // console.log("chat hooks component has mounted");
        // console.log("elemRef =", elemRef);
        // console.log("scroll top:", elemRef.current.scrollTop);
        // console.log("Client height:", elemRef.current.clientHeight);
        // console.log("scroll height:", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);
    const keyCheck = e => {
        // console.log("e.target.value", e.target.value);
        // console.log("key pressed:", e.key);
        if (e.key === "Enter") {
            e.preventDefault(); //stops enter taking cursor to the next line
            console.log(e.target.value);
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div>
            <div className="chat-container">
                <h2>Welcome to Chat</h2>
                <div className="chat" ref={elemRef}>
                    {lastTen.length > 0 && (
                        <p>
                            {lastTen.map(item => (
                                <li key={item.id}>
                                    {item.first_name}
                                    {item.last_name}
                                    {item.chat_text}
                                </li>
                            ))}
                        </p>
                    )}
                </div>
                <textarea placeholder="add message here" onKeyDown={keyCheck} />
            </div>
        </div>
    ); //end of return
}
