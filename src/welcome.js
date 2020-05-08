import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div className="welcomediv">
            <div className="welcometext">
                <h1>Welcome to Qira's Folk</h1>
                <img id="splashimg" src="/qirafig.jpg" />
                <h3>
                    An incredibly niche social network for fans of the least
                    successful RPG team ever to throw a double 1 and fall off a
                    flat floor
                </h3>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
