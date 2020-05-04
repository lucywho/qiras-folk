import React from "react";
import axios from "./axios";
import Child from "./child";

// export default function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

export default class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "lucy",
            last: "toman"
        };
    }

    componentDidMount() {
        //react equivalent of mounted
        //axios requests go here, returned data is stored in state

        // axios.get("/any-route").then(response => {
        //     console.log(response);
        //     this.setState({
        //         //updates state in React. Cannot just this.state.first = new value
        //         first: response.data.first
        //     });
        // });

        setTimeout(() => {
            this.setState({
                first: "Lucy",
                last: "Toman"
            });
        }, 2000);
    }

    handleClick() {
        //can't use "this" inside a method we create
        console.log("click handler fires");
        this.setState({
            first: "Lucy Catherine"
        });
    }

    render() {
        return (
            <div>
                Hello, {this.state.first} {this.state.last}!
                <Child surname={this.state.last} />
                <p onClick={() => this.handleClick()}>click me!</p>
                {/* arrow function binds class this to the handleClick function */}
            </div>
        );
    }
}
