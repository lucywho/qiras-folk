import React from "react";

export default function ProfilePic({ first, last, picUrl, toggleModal }) {
    picUrl = picUrl || "/default.jpg";
    let userName = first + " " + last;

    return (
        <div>
            <div className="pimg-container" onClick={toggleModal}>
                <img className="profile-pic" src={picUrl} alt={userName} />
            </div>
        </div>
    );
}
