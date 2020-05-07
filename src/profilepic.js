import React from "react";

export default function ProfilePic({ first, last, picUrl, toggleModal }) {
    //NOTE: can use props instead of deconstructing, then all refs below must be {props.first} etc

    //console.log("***profpic component - picUrl: ", picUrl);
    picUrl = picUrl || "/default.jpg";
    let userName = first + " " + last;
    console.log("pic url", picUrl);

    return (
        <div>
            <div className="pimg-container" onClick={toggleModal}>
                <img className="profile-pic" src={picUrl} alt={userName} />
                <p className="small">click to change</p>
            </div>
        </div>
    );
}
