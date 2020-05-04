import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to Qira's Folk</h1>
            <h3>
                An incredibly niche social network for fans of the least
                successful RPG team ever to throw a double 1 and fall off a flat
                floor
            </h3>
            <img id="splashimg" src="./qirafig.jpg" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
