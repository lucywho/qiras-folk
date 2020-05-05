import React from "react";

export default function ProfilePic({ first, last, picUrl, toggleModal }) {
    //NOTE: can use props instead of deconstructing, then all refs below must be {props.first} etc

    // console.log("Presentational props: ", props);
    picUrl = picUrl || "qirafig.jpg";
    let userName = first + " " + last;

    return (
        <div>
            <div className="pimg-container" onClick={toggleModal}>
                <img className="profile-pic" src={picUrl} alt={userName} />
                <p className="small">click to change</p>
            </div>
        </div>
    );
}
