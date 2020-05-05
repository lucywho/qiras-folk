import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted");
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
        console.log("this file", this.file);
    }

    uploadPic(e) {
        e.preventDefault();

        var formData = new FormData();

        formData.append("file", this.state.file);

        axios
            .post("/uploadProfilePic", formData)
            .then(response => {
                console.log("response in upload pic: ", response);
            })
            .catch(err => {
                console.log("error in upload pic: ", err);
            });
    }

    closeModal() {
        console.log("modal closing");
        this.props.toggleModal();
    }

    render() {
        return (
            <div>
                <p className="modalX" onClick={() => this.closeModal()}>
                    X
                </p>
                <h3>uploader component</h3>
                <input
                    onChange={e => this.handleChange(e)}
                    type="file"
                    name="file"
                    accept="jpg/*"
                />
                <button onClick={e => this.uploadPic(e)}>
                    Click here to upload a picture
                </button>
            </div>
        );
    }
}
