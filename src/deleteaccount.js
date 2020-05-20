import React from "react";
import axios from "./axios";

export default function DeleteAccount() {
    function submit() {
        console.log("clicked on delete account button");

        axios.post(`/deleteaccount`).then(response => {
            console.log("post response", response.data);
        });
    }
    return (
        <div>
            <div className="delete">
                {/* holding code for testing, need to work out how to integrate with app */}
                <button onClick={submit}> Delete your account </button>
            </div>
        </div> //end of wrapping div
    ); //end of return
}
