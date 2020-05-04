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
        // console.log("e.target.value: ", e.target.value);
        // console.log("e.target.name: ", e.target.name);
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
                //can deconstruct response to {data} and console log data direct

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
            <div className="registration" onChange={e => this.handleChange(e)}>
                <h3>Welcome to Qira's Folk</h3>
                <h3>
                    An incredibly niche social network for fans of the least
                    successful RPG team ever to throw a double 1 and fall off a
                    flat floor
                </h3>
                <img id="splashimg" src="./qirafig.jpg" />
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
                <button onClick={() => this.submit()}>Register Now!</button>

                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
