import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessage = useSelector(state => state && state.chatMessages);

    console.log("chatMessage in chat.js", chatMessage);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessage]);

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
                    {chatMessage && (
                        <div className="msg-div">
                            {chatMessage.map((item, index) => (
                                <li key={index}>
                                    <div className="single-msg">
                                        <div className="sm-sender">
                                            <img
                                                className="chat-pic"
                                                src={
                                                    item.pic_url
                                                        ? item.pic_url
                                                        : "/default.jpg"
                                                }
                                            />
                                            <div className="sm-name">
                                                {item.first_name}{" "}
                                                {item.last_name}
                                            </div>
                                        </div>
                                        <div className="sm-text">
                                            {item.chat_text}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    )}
                </div>
                <textarea
                    placeholder="type your message here and press Enter to send"
                    onKeyDown={keyCheck}
                />
            </div>
        </div>
    ); //end of return
}
