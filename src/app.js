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

        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
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

    updateProfilePic(arg) {
        console.log("argument", arg);
        this.setState({
            picUrl: arg
        });
        //console.log("this.picURl", this.state.picUrl);
    }

    methodInApp(arg) {
        console.log("methodInApp runs", arg);
    }

    render() {
        return (
            <div>
                <Logo />

                <p>App component placeholder</p>

                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    picUrl={this.state.picUrl}
                    toggleModal={this.toggleModal}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        updateProfilePic={this.updateProfilePic}
                        toggleModal={this.toggleModal}
                    />
                )}
            </div>
        );
    }
}
