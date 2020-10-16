import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVisible: false,
            draftBio: ""
        };
    }

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
        axios
            .post("/saveUserBio", this.state)
            .then(response => {
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
                            id="bio"
                            name="bio"
                            type="text"
                            placeholder="tell us about yourself (500 char limit)..."
                            maxlength="500"
                        />

                        <button className="save" onClick={e => this.saveBio(e)}>
                            Save your profile
                        </button>
                    </div>
                )}
                {this.props.bio && this.state.textAreaVisible == false && (
                    <div className="savedbio">
                        <div className="bio-display">{this.props.bio}</div>

                        <button
                            className="save"
                            onClick={() => this.toggleText()}
                        >
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
                            id="biotext"
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
