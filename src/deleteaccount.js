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
        <div>
            <button onClick={submit}> Delete your account </button>
        </div> //end of wrapping div
    ); //end of return
}
