import React from "react";
import BioEditor from "./bioeditor";

export default function Profile({
    first,
    last,
    picUrl,
    toggleModal,
    updateUserBio,
    bio
}) {
    picUrl = picUrl || "default.jpg";
    console.log("bio in profile comp", bio);
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
            <BioEditor bio={bio} updateUserBio={updateUserBio} /> />
        </div>
    );
}

//display name, large profile pic and bioeditor
