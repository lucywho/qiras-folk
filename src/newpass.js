import React, { useState, useEffect } from "react";
//import axios from "./axios";
import { Link } from "react-router-dom";

export default function NewPass() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("use effect fires");

        handleChange(e) {
            this.setState(
                {
                    [e.target.name]: e.target.value
                },
                () => console.log("this.state", this.state)
            );
        }
        
        reqcode() {
            console.log("about to request code: ", step);
            axios
                .post("/password/reset/step1", step)
                .then(response => {
                    if (response.data.success) {
                        setStep(2);
                    } else {
                        setError(true);
                        console.log("reset error at step 1")
                    }
                })
                .catch(err => {
                    console.log("error in request code", err);
                });
        };

        // reset() {
        //     console.log("about to reset password,", this.state);

        //     axios
        //         .post("/password/reset/step2", this.state)
        //         .then(response => {
        //             if (response.data.success) {
        //                 this.setState({
        //                     step: 3,
        //                     resetPass: false
        //                 });
        //             } else {
        //                 this.setState({
        //                     error: true
        //                 });
        //             }
        //         })
        //         .catch(err => {
        //             console.log("error in request code", err);
        //         });
        // };
    });

    return (
        <></>
        // <div className="reset">
        //     {this.state.step == 1 && (
        //         <div className="reset1" onChange={e => this.handleChange(e)}>
        //             <h3>Please enter your email address</h3>
        //             <br />
        //             <p>
        //                 We will send an access code to this email address,
        //                 <br />
        //                 which you will need to reset your password
        //                 <br />
        //                 <br />
        //                 <strong>Access codes are valid for 10 minutes</strong>
        //                 <br />
        //                 <br />
        //             </p>
        //             {this.state.error && (
        //                 <div>
        //                     Please check that you have submitted the correct
        //                     email address.
        //                 </div>
        //             )}

        //             <input
        //                 name="email"
        //                 type="email"
        //                 placeholder="email address..."
        //             />
        //             <br></br>
        //             <button onClick={() => this.reqcode()}>Submit email</button>

        //             <h3>
        //                 <br />
        //                 Don't have an account yet?
        //             </h3>
        //             <Link to="/">
        //                 <button>Click here to register a new account</button>
        //             </Link>
        //         </div>
        //     )}
        //     {this.state.step == 2 && (
        //         <div className="reset2" onChange={e => this.handleChange(e)}>
        //             <h3>Please submit your secret code and a new password</h3>
        //             {this.state.error && (
        //                 <div>The code submitted was incorrect or expired.</div>
        //             )}
        //             <input
        //                 name="code"
        //                 type="text"
        //                 placeholder="enter your access code"
        //             />
        //             <input
        //                 name="password"
        //                 type="password"
        //                 placeholder="enter a new password"
        //             />
        //             <button onClick={() => this.reset()}>Reset password</button>
        //         </div>
        //     )}

        //     {this.state.step == 3 && (
        //         <div className="reset3">
        //             Congratulations! Your password has been successfully reset.
        //             Please click below to log in.
        //             <Link to="/login">
        //                 <button>Click here to Log in!</button>
        //             </Link>
        //         </div>
        //     )}
        // </div>
    );
}