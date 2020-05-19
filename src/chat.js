import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessage = useSelector(state => state && state.chatMessages);

    console.log("chatMessage in chat.js", chatMessage);

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
                    {chatMessage.length > 0 && (
                        <p>
                            {chatMessage.map(item => (
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
