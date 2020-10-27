import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [recentusers, setRecentUsers] = useState([]);

    const [searchusers, setSearchUsers] = useState("");

    const [matchUsers, setMatchUsers] = useState([]);

    useEffect(() => {
        let abort;

        axios
            .get(`/recentusers`)
            .then(response => {
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
        let abort;

        if (searchusers.length > 0) {
            axios
                .get(`/searchusers/${searchusers}`)
                .then(response => {
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
            <div className="new-users">
                {recentusers && (
                    <div>
                        <h2>Our newest members</h2>
                        <ul>
                            <div className="results-grid">
                                {recentusers.map(item => (
                                    <li key={item.id}>
                                        <div className="names">
                                            <Link to={"/user/" + item.id}>
                                                <div className="fr-pic-text">
                                                    <img
                                                        className="profile-pic"
                                                        src={
                                                            item.pic_url
                                                                ? item.pic_url
                                                                : "/default.jpg"
                                                        }
                                                        ref={pic_url =>
                                                            (item.pic_url = pic_url)
                                                        }
                                                        onError={() =>
                                                            (item.pic_url.src =
                                                                "/default.jpg")
                                                        }
                                                    />
                                                    <div className="fr-text">
                                                        {item.first_name}{" "}
                                                        {item.last_name}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </ul>
                    </div>
                )}
            </div>

            <div className="user-search">
                {matchUsers.length > 0 && (
                    <div>
                        <ul>
                            <h2>Search Results</h2>
                            <div className="results-grid">
                                {matchUsers.map(item => (
                                    <li key={item.id}>
                                        <div className="names">
                                            <Link to={"/user/" + item.id}>
                                                <div className="fr-pic-text">
                                                    <img
                                                        className="profile-pic"
                                                        src={
                                                            item.pic_url
                                                                ? item.pic_url
                                                                : "/default.jpg"
                                                        }
                                                        ref={pic_url =>
                                                            (item.pic_url = pic_url)
                                                        }
                                                        onError={() =>
                                                            (item.pic_url.src =
                                                                "/default.jpg")
                                                        }
                                                    />
                                                    <div className="fr-text">
                                                        {item.first_name}{" "}
                                                        {item.last_name}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </ul>
                    </div>
                )}
            </div>

            <div className="no-results">
                {matchUsers.length == 0 && !recentusers && (
                    <div>
                        <div>
                            <h2 style={{ marginLeft: 10 + "px" }}>
                                No results
                            </h2>
                        </div>
                    </div>
                )}
            </div>
            <div className="search-users">
                <h2>Search for another user</h2>

                <input
                    style={{ marginLeft: 10 + "px" }}
                    onChange={e => {
                        setSearchUsers(e.target.value);
                        setRecentUsers(null);
                    }}
                    type="text"
                    name="search_users"
                    placeholder="search for another user"
                />
            </div>
        </div>
    );
}
