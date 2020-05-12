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
    picUrl = picUrl || "/default.jpg";
    //console.log("bio in profile comp", bio);
    return (
        <div className="bio" className="container">
            <div className="bio-name">
                <h2>
                    {first} {last}
                </h2>
            </div>
            <div className="bio-pic">
                <img src={picUrl} />
            </div>

            <BioEditor bio={bio} updateUserBio={updateUserBio} />
        </div>
    );
}
