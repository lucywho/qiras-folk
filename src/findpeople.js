import React, { useState, useEffect, useReducer } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";

export default function FindPeople() {
    const [recentusers, setRecentUsers] = useState([]);

    const [searchusers, setSearchUsers] = useState([]);

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
        }
    }, [searchusers]);

    return (
        <div>
            <h1>Find People</h1>
            {recentusers && (
                <div className="new-users">
                    <h2>Our newest members</h2>
                    {recentusers.map(item => (
                        <ul key={item.id}>
                            <img className="profile-pic" src={item.pic_url} />
                            {item.first_name}
                            {""}
                            {item.last_name}
                        </ul>
                    ))}
                </div>
            )}

            <div className="user-search">
                <h2>Search for friends</h2>
                <ul>
                    {matchUsers &&
                        matchUsers.map(item => (
                            <li key={item.id}>
                                <img
                                    className="profile-pic"
                                    src={item.pic_url}
                                />
                                {item.first_name}
                                {""}
                                {item.last_name}
                            </li>
                        ))}
                </ul>
            </div>

            <input
                onChange={e => {
                    setSearchUsers(e.target.value);
                    setRecentUsers([]);
                }}
                type="text"
                name="search_users"
                placeholder="search for another user"
            />
        </div>
    );
}
