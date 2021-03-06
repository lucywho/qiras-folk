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
import DeleteAccount from "./deleteaccount";
import NewPass from "./newpass";

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
        axios
            .get("/userinfo")
            .then(response => {
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    picUrl: response.data.picUrl,
                    bio: response.data.bio
                });
            })
            .catch(err => {
                console.log("app.js error in get user info", err);
            });
    }

    toggleModal() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible
        });
    }

    updateProfilePic(arg) {
        this.setState({
            picUrl: arg
        });
    }

    updateUserBio(arg) {
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

                        <Link to="/">
                            <button>Your profile</button>
                        </Link>
                        <Link to="/friends">
                            <button>Your friends</button>
                        </Link>
                        <Link to="/findpeople">
                            <button>Find new friends</button>
                        </Link>
                        <Link to="/chat">
                            <button>Chat room</button>
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
                                    toggleReset={this.toggleReset}
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
                        <Route path="/newpass" render={() => <NewPass />} />
                        <Route
                            path="/deleteaccount"
                            render={() => <DeleteAccount />}
                        />

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
