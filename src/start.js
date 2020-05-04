import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    elem = (
        <div id="startelem">
            <img className="logo" src="./qirafig.jpg" />
            <div className="logout">
                <a href="/logout">
                    <button> Log Out </button>
                </a>
            </div>
        </div>
    );
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
