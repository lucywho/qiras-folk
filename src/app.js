import React from "react";
import ProfilePic from "./profilepic";
import Logo from "./logo";
import Uploader from "./uploader";
import axios from "./axios";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import OtherProfile from "./other-profile";
import FindPeople from "./findpeople";
import Friends from "./friends";
import Chat from "./chat";

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
                //console.log("app.js user info response.data: ", response.data);
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    picUrl: response.data.picUrl,
                    bio: response.data.bio
                });

                // console.log("APP state", this.state);

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
                <div className="app-container">
                    <div className="nav-bar">
                        <Logo />

                        <Link to="/friends">
                            <button>Friends</button>
                        </Link>
                        <Link to="/findpeople">
                            <button>Search</button>
                        </Link>
                        <Link to="/chat">
                            <button>Chat</button>
                        </Link>

                        <Link to="/">
                            <button>Your Profile</button>
                        </Link>

                        <button onClick={() => location.replace("/logout")}>
                            Logout
                        </button>

                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            picUrl={this.state.picUrl}
                            toggleModal={this.toggleModal}
                        />
                    </div>

                    <div className="app-contents">
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

                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />

                        <Route
                            path="/findpeople"
                            render={() => <FindPeople />}
                        />

                        <Route path="/friends" render={() => <Friends />} />
                        <Route path="/chat" render={() => <Chat />} />

                        {this.state.uploaderVisible && (
                            <Uploader
                                updateProfilePic={this.updateProfilePic}
                                toggleModal={this.toggleModal}
                            />
                        )}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
