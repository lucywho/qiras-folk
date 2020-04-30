import React from "react";
import ReactDOM from "react-dom";
//import HelloWorld from "./helloworld";
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    elem = <h1>logo goes here</h1>;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
