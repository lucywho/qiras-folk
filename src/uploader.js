import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            file: null
        };
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    uploadPic(e) {
        e.preventDefault();

        var formData = new FormData();

        formData.append("file", this.state.file);

        axios
            .post("/uploadProfilePic", formData)
            .then(response => {
                this.props.updateProfilePic(response.data.picUrl);
                this.props.toggleModal();
            })
            .catch(err => {
                console.log("error in upload pic: ", err);
            });
    }

    closeModal() {
        this.props.toggleModal();
    }

    render() {
        return (
            <div>
                <div className="upload-pic-modal">
                    <p className="modalX" onClick={() => this.closeModal()}>
                        X
                    </p>
                    <h2>Choose a new profile picture</h2>
                    <input
                        onChange={e => this.handleChange(e)}
                        type="file"
                        name="file"
                        accept="jpg/*, png/*"
                    />
                    <button onClick={e => this.uploadPic(e)}>
                        change profile picture
                    </button>
                </div>
            </div>
        );
    }
}
