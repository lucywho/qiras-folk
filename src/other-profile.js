import React, { Component, Fragment } from "react";
import axios from "./axios";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.match", this.props.match.params.id);
        const otherUserId = this.props.match.params.id;
        //axios.get("api/user/" + otherUserId).then(results);

        //set otherUserId in state to render bio (but not editor) so grab bio, prof pic
        //check not same user (in server, if session id = otheruserid, reroute with history (see notes))
        //handle case where user tries to access non-existent profile
    }
    render() {
        return (
            <div className="other-profile-container">
                <h3>Other Profile Component</h3>
            </div>
        );
    }
}

export default OtherProfile;
