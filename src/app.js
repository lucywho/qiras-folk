import React from "react";
import ProfilePic from "./profilepic";
import Logo from "./logo";
import Uploader from "./uploader";
import axios from "./axios";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./other-profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderVisible: false,
            bio: ""
        };

        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.updateUserBio = this.updateUserBio.bind(this);
    }

    componentDidMount() {
        //async compdidmount () {
        //const {data} = await axios.get("/userinfo")
        //this.setState(data)
        //}
        axios
            .get("/userinfo")
            .then(response => {
                console.log("app.js user info response.data: ", response.data);
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    picUrl: response.data.picUrl,
                    bio: response.data.bio
                });

                console.log("APP state", this.state);
                console.log("APP bio state", this.state.bio);

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

    updateUserBio(arg) {
        console.log("user bio argument", arg);
        this.setState({
            bio: arg
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Logo />

                    <p>App component placeholder</p>

                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        picUrl={this.state.picUrl}
                        toggleModal={this.toggleModal}
                    />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                picUrl={this.state.picUrl}
                                toggleModal={this.toggleModal}
                                updateUserBio={this.updateUserBio}
                                bio={this.state.bio}
                            />
                        )}
                    />

                    <Route exact path="/user/:id" component={OtherProfile} />

                    {this.state.uploaderVisible && (
                        <Uploader
                            updateProfilePic={this.updateProfilePic}
                            toggleModal={this.toggleModal}
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
