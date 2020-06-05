import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
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

    login() {
        console.log("about to login: ", this.state);

        axios
            .post("/login", this.state)
            .then(response => {
                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("login.js error in post register", err);
            });
    }

    render() {
        return (
            <div className="login" onChange={e => this.handleChange(e)}>
                {this.state.error && (
                    <div>
                        I have a bad feeling about this... please check your
                        email and password
                    </div>
                )}
                <h3>Please enter your email and password</h3>
                <input
                    name="email"
                    type="email"
                    placeholder="email address..."
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password..."
                />
                <button onClick={() => this.login()}>Login Now!</button>
                <div>
                    <br />
                    <h3>New to Qira's Folk?</h3>
                    <Link to="/">
                        <button>Click here to Register</button>
                    </Link>
                </div>
                <div>
                    <br />
                    <h3>Forgotten password?</h3>
                    <Link to="/reset">
                        <button>Click here to reset your password</button>
                    </Link>
                </div>
            </div>
        );
    }
}
