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
        // console.log("e.target.value: ", e.target.value);
        // console.log("e.target.name: ", e.target.name);
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
                console.log("login.js error in post register", err);
            });
    }

    render() {
        return (
            <div className="login" onChange={e => this.handleChange(e)}>
                <h3>This is the Login Component</h3>
                {this.state.error && (
                    <div>
                        I have a bad feeling about this... please check your
                        email and password
                    </div>
                )}

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
                    <h3>New to Qira's Folk?</h3>
                    <Link to="/">
                        <button>Click here to Register</button>
                    </Link>
                </div>
            </div>
        );
    }
}
