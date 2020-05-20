import React from "react";
import axios from "./axios";
{
    /* holding code for testing, need to work out how to integrate with app */
}

export default function DeleteAccount() {
    function submit() {
        console.log("clicked on delete account button");

        axios.post(`/deleteaccount`).then(response => {
            console.log("/deleteaccount response");
        });
    }
    return (
        <div className="container">
            <h2>We're sorry to see you go</h2>
            <h3 className="highlight">
                important information about deleting your account: please read
            </h3>
            <ul className="del-info">
                <li>
                    Clicking "Delete Account: Confirm" will remove all of your
                    data from the site
                </li>
                <li>
                    All your chat messages, friendships, and profile information
                    will be deleted
                </li>
                <li>Deleting your account cannot be undone</li>
                <li>
                    If you decide to return, you will have to re-register as a
                    new user
                </li>
                <li>
                    Still want to go? Please click "Delete Account: Confirm"
                </li>
            </ul>

            <button className="delete" onClick={submit}>
                Delete Account: Confirm
            </button>
        </div> //end of wrapping div
    ); //end of return
}
