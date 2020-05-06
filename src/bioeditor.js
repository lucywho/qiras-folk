import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class BioEditor extends React.Component {
    constructor() {
        super();
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
        console.log("about to save bio: ", this.state);

        axios
            .post("/saveUserBio", this.state)
            .then(response => {
                console.log("saveUserBio response.data:", response.data);

                if (response.data.bio) {
                    this.setState({
                        draftBio: response.data.bio
                    });

                    this.toggleText();
                } else {
                    console.log("error returning bio");
                }
            })
            .catch(err => {
                console.log("error in saveUserBio", err);
            });
    }

    render() {
        return (
            <div className="bioeddiv">
                {this.state.draftBio == "" &&
                    this.state.textAreaVisible == false && (
                        <div className="nobio">
                            <button onClick={() => this.toggleText()}>
                                Tell us about yourself
                            </button>
                        </div>
                    )}
                {this.state.draftBio == "" &&
                    this.state.textAreaVisible == true && (
                        <div
                            className="writebio"
                            onChange={e => this.handleChange(e)}
                        >
                            <textarea
                                name="bio"
                                type="text"
                                placeholder="tell us about yourself..."
                            />

                            <button onClick={() => this.saveBio()}>
                                Save your profile
                            </button>
                        </div>
                    )}
                {this.state.draftBio !== "" &&
                    this.state.textAreaVisible == false && (
                        <div className="savedbio">
                            <div>
                                <p>{this.props.bio}</p>
                            </div>
                            <div>update bio worked</div>
                            <button onClick={() => this.toggleText()}>
                                Edit your profile
                            </button>
                        </div>
                    )}
                {this.state.draftBio !== "" &&
                    this.state.textAreaVisible == true && (
                        <div
                            className="editbio"
                            onChange={e => this.handleChange(e)}
                        >
                            <textarea
                                name="bio"
                                type="text"
                                defaultValue={this.props.bio}
                            />

                            <button onClick={() => this.saveBio()}>
                                Save your profile
                            </button>
                        </div>
                    )}
            </div>
        );
    }
}

//see reset for conditional rendering
//capture bio - event handler, put in state (see reset password)
//axios post
//db insert
//new bd column for bio
//return to state in app

//app.js holds bio in stat
// passes bio to profile, profile passes bio to bioeditor
