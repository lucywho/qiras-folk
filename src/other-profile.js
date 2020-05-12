import React, { Component, Fragment } from "react";
import axios from "./axios";
import FriendButton from "./friend-button";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.match", this.props.match.params.id);
        const otherUserId = this.props.match.params.id;
        console.log("otherUserId", otherUserId);

        axios
            .get("/api/user/" + otherUserId)
            .then(response => {
                console.log("api/user/:id response to o-p", response.data);

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
            <div className="other-profile" className="container">
                {this.state.noUser && (
                    <div>
                        <div className="bio-pic">
                            <img src="/default.jpg" />
                        </div>
                        <p>The user you selected does not exist</p>
                    </div>
                )}
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
                    />
                </div>

                <div className="bio-display">
                    <p>{this.state.bio}</p>
                </div>
                <FriendButton otherUserId={this.props.match.params.id} />
            </div>
        );
    }
}

export default OtherProfile;
