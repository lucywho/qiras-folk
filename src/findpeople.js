import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [recentusers, setRecentUsers] = useState([]);

    const [searchusers, setSearchUsers] = useState("");

    const [matchUsers, setMatchUsers] = useState([]);

    //console.log("searchusers", searchusers);

    useEffect(() => {
        //console.log("use effect running in FindPeople");
        let abort;

        axios
            .get(`/recentusers`)
            .then(response => {
                console.log("get users response.data:", response.data);
                if (!abort) {
                    setRecentUsers(response.data);
                }
            })
            .catch(err => {
                console.log("catch error in get users", err);
            });
        return () => {
            abort = true;
            setMatchUsers(null);
        };
    }, []);

    useEffect(() => {
        console.log("second use effect running in FindPeople");
        console.log("searchusers", searchusers);
        let abort;

        if (searchusers.length > 0) {
            axios
                .get(`/searchusers/${searchusers}`)
                .then(response => {
                    console.log("search users response.data:", response.data);
                    if (!abort) {
                        setMatchUsers(response.data);
                    }
                })
                .catch(err => {
                    console.log("catch error in get users", err);
                });

            return () => {
                abort = true;
            };
        } else {
            setMatchUsers([]);
        }
    }, [searchusers]);

    return (
        <div className="users-container">
            <h1>Find People</h1>
            <div className="new-users">
                {recentusers && (
                    <div>
                        <ul>
                            <h2>Our newest members</h2>
                            {recentusers.map(item => (
                                <li key={item.id}>
                                    <Link to={"/user/" + item.id}>
                                        <div className="names">
                                            <img
                                                className="profile-pic"
                                                src={
                                                    item.pic_url
                                                        ? item.pic_url
                                                        : "/default.jpg"
                                                }
                                            />
                                            {item.first_name} {item.last_name}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="user-search">
                {matchUsers.length > 0 && (
                    <div>
                        <h2>Search Results</h2>
                        <ul>
                            {matchUsers.map(item => (
                                <li key={item.id}>
                                    <Link to={"/user/" + item.id}>
                                        <div className="names">
                                            <img
                                                className="profile-pic"
                                                src={
                                                    item.pic_url
                                                        ? item.pic_url
                                                        : "/default.jpg"
                                                }
                                            />
                                            {item.first_name} {item.last_name}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="no-results">
                {matchUsers.length == 0 && !recentusers && (
                    <div>
                        <h2>No results</h2>
                    </div>
                )}
            </div>

            <input
                onChange={e => {
                    setSearchUsers(e.target.value);
                    setRecentUsers(null);
                    //if e.target.value is empty, need to set text field value to "".
                }}
                type="text"
                name="search_users"
                placeholder="search for another user"
            />
        </div>
    );
}
