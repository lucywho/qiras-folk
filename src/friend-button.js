import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton({ otherUserId }) {
    console.log("otherUserId", otherUserId);
    const [buttonText, setButtonText] = useState("Send Friend Request");
    useEffect(() => {
        // axios.get(`/friendshipstatus/${otherUserId}`).then(response => {
        //     console.log("response", response);
        //     //return json from server with buttonText strings: make friends, accept, end, cancel,
        //     setButtonText(response.data.buttonText);
        // });
    }, []);

    function submit() {
        console.log("clicked on button: text is", buttonText);
    }
    return (
        <div>
            <button className="friend-button" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
