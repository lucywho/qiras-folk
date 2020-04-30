import React from "react";
import axios from "axios";

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

        axios.post("/registration").then(response => {
            console.log(response);
            this.setState({
                //updates state in React. Cannot just this.state.first = new value
                //first: response.data.first
            });
        });
    }

    submit() {
        console.log("about to submit: ", this.state);

        axios.post("/register", this.state).then(response => {
            console.log("response.data: ", response.data);

            //can deconstruct response to {data} and console log data direct

            if (response.data.success) {
                location.replace("/");
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }

    render() {
        return (
            <div className="registration">
                <h3>This is the Registration Component</h3>
                {this.state.error && <div>Something went wrong</div>}
                <input
                    name="first"
                    placeholder="firstname..."
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="lastname..."
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="email..."
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password..."
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>Register Now!</button>
            </div>
        );
    }
}
