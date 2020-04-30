import React from "react";
import ReactDOM from "react-dom";
//import HelloWorld from "./helloworld";
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    elem = <img className="logo" src="./qirafig.jpg" />;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
