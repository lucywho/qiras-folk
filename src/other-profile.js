import React, { Component, Fragment } from "react";
import axios from "./axios";
import FriendButton from "./friend-button";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const otherUserId = this.props.match.params.id;

        axios
            .get("/api/user/" + otherUserId)
            .then(response => {
                this.setState({
                    sameUser: response.data.sameUser,
                    first: response.data.first,
                    last: response.data.last,
                    bio: response.data.bio,
                    picUrl: response.data.picUrl,
                    noUser: response.data.noUser
                });

                if (this.state.sameUser) {
                    this.props.history.push("/");
                }
            })
            .catch(err => {
                console.log("error in api/user get request", err);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="bio">
                    {this.state.noUser && (
                        <div>
                            <div className="bio-pic">
                                <img src="/default.jpg" />
                            </div>
                            <p>Sorry, we can't find a user with that name</p>
                        </div>
                    )}
                    <div className="bio-left">
                        <div className="bio-name">
                            <h2>
                                {this.state.first} {this.state.last}
                            </h2>
                        </div>
                        <div className="bio-pic">
                            <img
                                src={
                                    this.state.picUrl
                                        ? this.state.picUrl
                                        : "/default.jpg"
                                }
                                ref={picUrl => (this.picUrl = picUrl)}
                                onError={() =>
                                    (this.picUrl.src = "/default.jpg")
                                }
                            ></img>
                        </div>
                        <div className="profbuttons">
                            <FriendButton
                                otherUserId={this.props.match.params.id}
                            />
                        </div>
                    </div>
                    <div className="bio-right">
                        <div className="bio-display">
                            <p>{this.state.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherProfile;
