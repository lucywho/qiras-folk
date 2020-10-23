import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessage = useSelector(state => state && state.chatMessages);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessage]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <div className="chat-container">
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
                    id="chat-text"
                    placeholder="type your message here and press Enter to send"
                    onKeyDown={keyCheck}
                />
            </div>
        </>
    );
}
