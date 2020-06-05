import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("Oops - something is broken");

    useEffect(() => {
        axios.get(`/friendstatus/${otherUserId}`).then(response => {
            setButtonText(response.data.buttonText);
        });
    }, []);

    function submit() {
        axios
            .post(`/updatefriendship/${otherUserId}/${buttonText}`)
            .then(response => {
                setButtonText(response.data.buttonText);
            });
    }

    return (
        <div>
            <button className="friend-button" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
