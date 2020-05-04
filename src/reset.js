import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            step: 1
        };
    }

    reqcode() {
        console.log("about to request code: ", this.state);
        axios
            .post("/password/reset/step1", this.state)
            .then(response => {
                console.log("response.data: ", response.data);

                if (response.data.success) {
                    this.setState({
                        step: 2
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("error in request code", err);
            });
    }

    reset() {
        console.log("about to reset password,", this.state);

        axios
            .post("/password/reset/step2", this.state)
            .then(response => {
                console.log("response.data: ", response.data);

                if (response.data.success) {
                    this.setState({
                        step: 3
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("error in request code", err);
            });
    }

    render() {
        return (
            <div className="resetdiv">
                {this.state.step == 1 && (
                    <div
                        className="reset1"
                        onChange={e => this.handleChange(e)}
                    >
                        <h3>
                            Please submit the email address you registered with
                        </h3>
                        {this.state.error && (
                            <div>
                                Please check that you have submitted the correct
                                email address.
                            </div>
                        )}

                        <input
                            name="email"
                            type="email"
                            placeholder="email address..."
                        />
                        <button onClick={() => this.reqcode}>
                            Submit email
                        </button>
                    </div>
                )}
                {this.state.step == 2 && (
                    <div
                        className="reset2"
                        onChange={e => this.handleChange(e)}
                    >
                        <h3>
                            Please submit your secret code and a new password
                        </h3>
                        {this.state.error && (
                            <div>
                                The code submitted was incorrect or expired.
                            </div>
                        )}
                        <input
                            name="code"
                            type="text"
                            placeholder="enter your secret code"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="enter a new password"
                        />
                        <button onClick={() => this.reset}>
                            Reset password
                        </button>
                    </div>
                )}
                ;
                {this.state.step == 3 && (
                    <div className="reset3">
                        Congratulations! Your password has been successfully
                        reset. Please click below to log in.
                        <Link to="/login">
                            <button>Click here to Log in!</button>
                        </Link>
                    </div>
                )}
                ;
            </div>
        );
    }
}
