import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    console.log("otherUserId", otherUserId);
    const [buttonText, setButtonText] = useState(
        "Default - something is broken"
    );

    useEffect(() => {
        //set inital button text
        axios.get(`/friendstatus/${otherUserId}`).then(response => {
            console.log("response", response);
            setButtonText(response.data.buttonText);
        });
    }, []);

    function submit() {
        console.log("clicked on button: text is", buttonText);
        axios
            .post(`/updatefriendship/${otherUserId}/${buttonText}`)
            .then(response => {
                console.log("post response", response.data);
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
