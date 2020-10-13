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
        <div className="container">
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
                </div>
                <div className="bio-right">
                    <BioEditor bio={bio} updateUserBio={updateUserBio} />
                    <div>
                        <Link to="/newpass">
                            <button>Click here to reset your password</button>
                        </Link>
                    </div>

                    <Link to="/deleteaccount">
                        <button>Delete your account</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
