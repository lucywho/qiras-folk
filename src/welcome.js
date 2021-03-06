import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div className="welcomediv">
            <div className="welcomebanner">
                <img id="splashimg" src="/QFlogo.png" />
                <div className="welcometext">
                    <h1>Welcome to</h1>
                    <h1 className="qira">
                        <em>Qira's Folk</em>
                    </h1>

                    <h3>
                        An incredibly niche social network for fans of the least
                        successful RPG team ever to throw a double 1 and fall
                        off a flat floor
                    </h3>
                </div>
            </div>
            <div className="welcomecomponent">
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/reset" component={ResetPassword} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
