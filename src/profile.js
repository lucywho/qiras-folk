import React from "react";
//import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile({ first, last, picUrl, toggleModal, bio }) {
    picUrl = picUrl || "default.jpg";
    return (
        <div className="bio-container">
            <div className="bio-pic">
                <img src={picUrl} />
            </div>
            <div className="bio-name">
                <h2>
                    {first} {last}
                </h2>
            </div>
            <BioEditor bio={bio} />
        </div>
    );
}

//display name, large profile pic and bioeditor
