import React from "react";

export default function ProfilePic({ first, last, picUrl }) {
    //NOTE: can use props instead of deconstructing, then all refs below must be {props.first} etc

    // console.log("Presentational props: ", props);
    picUrl = picUrl || "qirafig.jpg";

    return (
        <div>
            <h2>
                This is the ProfilePic component, {first} {last}
            </h2>
            <img className="profile-pic" src={picUrl} alt="{first}{last}" />
        </div>
    );
}
