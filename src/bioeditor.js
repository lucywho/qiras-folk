import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVisible: false,
            draftBio: ""
        };
        console.log("BIOEDITOR state", this.state);
    }

    //pick up text input
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state", this.state)
        );
    }

    toggleText() {
        console.log("toggle text running");
        this.setState({
            textAreaVisible: !this.state.textAreaVisible
        });
    }

    saveBio() {
        //console.log("about to save bio: ", this.state);

        axios
            .post("/saveUserBio", this.state)
            .then(response => {
                console.log("saveUserBio response.data:", response.data);

                this.setState({
                    draftBio: response.data.bio
                });
                this.props.updateUserBio(response.data.bio);
                this.toggleText();
            })
            .catch(err => {
                console.log("error in saveUserBio", err);
            });
    }

    render() {
        return (
            <div className="bioeddiv">
                {!this.props.bio && this.state.textAreaVisible == false && (
                    <div className="no-bio">
                        <button onClick={() => this.toggleText()}>
                            Tell us about yourself
                        </button>
                    </div>
                )}
                {!this.props.bio && this.state.textAreaVisible == true && (
                    <div
                        className="writebio"
                        onChange={e => this.handleChange(e)}
                    >
                        <textarea
                            name="bio"
                            type="text"
                            placeholder="tell us about yourself..."
                        />

                        <button className="save" onClick={e => this.saveBio(e)}>
                            Save your profile
                        </button>
                    </div>
                )}
                {this.props.bio && this.state.textAreaVisible == false && (
                    <div className="savedbio">
                        <div className="bio-display">{this.props.bio}</div>

                        <button onClick={() => this.toggleText()}>
                            Edit your profile
                        </button>
                    </div>
                )}
                {this.props.bio && this.state.textAreaVisible == true && (
                    <div
                        className="editbio"
                        onChange={e => this.handleChange(e)}
                    >
                        <textarea
                            name="bio"
                            type="text"
                            defaultValue={this.props.bio}
                        />

                        <button className="save" onClick={e => this.saveBio(e)}>
                            Save your profile
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
