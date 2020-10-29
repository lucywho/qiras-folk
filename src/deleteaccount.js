import React from "react";
import axios from "./axios";

export default function DeleteAccount() {
    function submit() {
        axios.post(`/deleteaccount`).then(response => {
            console.log("/deleteaccount response", response);
        });
    }
    return (
        <div className="container">
            <h2 className="del-h2">We're sorry to see you go</h2>
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
                <br></br>
                <li>
                    <h4>Sure you want to go? Please click "DELETE ACCOUNT"</h4>
                </li>
            </ul>

            <a href="/logout">
                <button className="delete" onClick={submit}>
                    DELETE ACCOUNT
                </button>
            </a>
        </div>
    );
}
