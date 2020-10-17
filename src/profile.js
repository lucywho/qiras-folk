import React from "react";
import BioEditor from "./bioeditor";
import { Link } from "react-router-dom";

export default function Profile({
    first,
    last,
    picUrl,
    updateUserBio,
    bio,
    toggleModal
}) {
    picUrl = picUrl || "/default.jpg";

    return (
        <div className="profile-container">
            <div className="bio">
                <div className="bio-left">
                    <div className="bio-name">
                        <h2>
                            {first} {last}
                        </h2>
                    </div>
                    <div className="bio-pic" onClick={toggleModal}>
                        <img src={picUrl} />

                        <p>click to change</p>
                    </div>
                    <br></br>
                    <div className="profbuttons">
                        <Link to="/newpass">
                            <button>reset your password</button>
                        </Link>

                        <Link to="/deleteaccount">
                            <button>delete your account</button>
                        </Link>
                    </div>
                </div>
                <div className="bio-right">
                    <BioEditor bio={bio} updateUserBio={updateUserBio} />
                </div>
            </div>
        </div>
    );
}
