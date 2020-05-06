import React from "react";
import BioEditor from "./bioeditor";

export default function Profile({
    first,
    last,
    picUrl,
    toggleModal,
    saveUserBio,
    bio
}) {
    picUrl = picUrl || "default.jpg";
    console.log("bio in profile comp", { bio }, { saveUserBio });
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
            <BioEditor bio={{ saveUserBio }} />
        </div>
    );
}

//display name, large profile pic and bioeditor
