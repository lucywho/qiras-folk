import React from "react";
import BioEditor from "./bioeditor";

export default function Profile({ first, last, picUrl, updateUserBio, bio }) {
    picUrl = picUrl || "/default.jpg";
    //console.log("bio in profile comp", bio);
    return (
        <div className="container">
            <div className="bio">
                <div className="bio-left">
                    <div className="bio-name">
                        <h2>
                            {first} {last}
                        </h2>
                    </div>
                    <div className="bio-pic">
                        <img src={picUrl} />
                    </div>
                </div>
                <div className="bio-right">
                    <BioEditor bio={bio} updateUserBio={updateUserBio} />
                    {/* <DeleteAccount /> */}
                </div>
            </div>
        </div>
    );
}
