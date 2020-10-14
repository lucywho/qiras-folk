import React, { useState } from "react";
import axios from "./axios";

export default function NewPass() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);

    function checkPass() {
        let currpass = document.getElementById("currpass").value;
        console.log(currpass);

        const data = {
            currpass: currpass
        };

        axios
            .post("/password/change/step1", data)
            .then(response => {
                if (response.data.success) {
                    setStep(2);
                } else {
                    setError(true);
                    console.log("reset error at step 1");
                }
            })
            .catch(err => {
                console.log("error in request code", err);
            });
    }

    function changePass() {
        console.log("changePass fires");
        //     console.log("about to reset password,", step);
        //     axios
        //         .post("/password/change/step2", step)
        //         .then(response => {
        //             if (response.data.success) {
        //                 setStep(3);
        //             } else {
        //                 setError(true);
        //             }
        //         })
        //         .catch(err => {
        //             console.log("error in request code", error);
        //         });
    }

    return (
        <div className="new">
            {step == 1 && (
                <div className="new1">
                    <h3>Please enter your current password</h3>
                    <br></br>

                    {error && (
                        <div>
                            Please retype your password. If you have forgotten
                            your password, please log out and select the "reset
                            password" option.
                        </div>
                    )}

                    <input
                        name="password"
                        id="currpass"
                        type="password"
                        placeholder="current password"
                    />
                    <br></br>
                    <br></br>

                    <button onClick={() => checkPass()}>Submit</button>
                </div>
            )}
            {step == 2 && (
                <div className="new2">
                    <h3>Please enter your new password</h3>
                    <br></br>
                    {error && (
                        <div>
                            Please enter a new password in the box below and
                            click Submit.
                        </div>
                    )}

                    <input
                        name="newpassword"
                        id="newpass"
                        type="password"
                        placeholder="new password"
                    />
                    <button onClick={changePass()}>Change password</button>
                </div>
            )}

            {step == 3 && (
                <div className="new3">
                    Congratulations! Your password has been successfully
                    changed.
                </div>
            )}
        </div>
    );
}
