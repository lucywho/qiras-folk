import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state", this.state)
        );
    }

    submit() {
        console.log("about to submit: ", this.state);

        axios
            .post("/register", this.state)
            .then(response => {
                console.log("response.data: ", response.data);

                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("registration.js error in post register", err);
            });
    }

    render() {
        return (
            <div className="loggingin" onChange={e => this.handleChange(e)}>
                <h3>Register Now!</h3>

                {this.state.error && (
                    <div>
                        I have a bad feeling about this... please check that you
                        have completed all fields
                    </div>
                )}
                <input name="first" placeholder="first name..." />
                <input name="last" placeholder="last name..." />
                <input
                    name="email"
                    type="email"
                    placeholder="email address..."
                />
                <input
                    name="password"
                    type="password"
                    placeholder="choose a password..."
                />
                <button onClick={() => this.submit()}>
                    click to register!
                </button>
                <div>
                    <br />
                    <h3>Already a member?</h3>
                    <Link to="/login">
                        <button>click here to log in!</button>
                    </Link>
                </div>
            </div>
        );
    }
}
