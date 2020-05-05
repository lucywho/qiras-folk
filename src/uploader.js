import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        //console.log("uploader mounted");
    }

    methodInUploader() {
        //code here to save url
        //pass to app as argument (replace "")
        this.props.methodInApp("heres a thing");
    }

    render() {
        return (
            <div>
                <h3>uploader component</h3>
                <h3 onClick={() => this.methodInUploader()}>
                    Click here to run methodInUploader
                </h3>
            </div>
        );
    }
}
