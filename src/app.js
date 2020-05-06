import React from "react";
import ProfilePic from "./profilepic";
import Logo from "./logo";
import Uploader from "./uploader";
import axios from "./axios";
import Profile from "./profile";
//import BioEditor from "./bioeditor";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderVisible: false,
            bio: ""
        };

        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        //async compdidmount () {
        //const {data} = await axios.get("/userinfo")
        //this.setState(data)
        //}
        axios
            .get("/userinfo")
            .then(response => {
                console.log("response.data: ", response.data);
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    picUrl: response.data.picUrl
                });

                //console.log("APP state", this.state);

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

                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    picUrl={this.state.picUrl}
                    toggleModal={this.toggleModal}
                    bio={this.state.bio}
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
