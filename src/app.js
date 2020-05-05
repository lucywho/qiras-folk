import React from "react";
import ProfilePic from "./profilepic";
import Logo from "./logo";
import Uploader from "./uploader";
import axios from "axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderVisible: false
        };
    }

    componentDidMount() {
        axios
            .get("/userinfo")
            .then(response => {
                console.log("response.data: ", response.data);
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    picUrl: response.data.picUrl
                });

                console.log("APP state", this.state);

                //can deconstruct response to {data} and console log data direct
            })
            .catch(err => {
                console.log("app.js error in get user info", err);
            });
    }

    toggleModal() {
        console.log("toggle modal running");
        this.setState({
            uploaderVisible: !this.state.uploaderVisible
        });
    }

    methodInApp(arg) {
        console.log("methodInApp runs", arg);
    }

    render() {
        return (
            <div>
                <Logo />

                <h1>This is the App component</h1>
                <h3 onClick={() => this.toggleModal()}>
                    App: toggleModal on click to toggle uploaderVisible state
                </h3>

                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    picUrl={this.state.picUrl}
                />
                {this.state.uploaderVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
