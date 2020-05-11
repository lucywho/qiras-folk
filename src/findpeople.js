import React, { useState, useEffect, useReducer } from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";

export default function FindPeople() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [recentusers, setRecentUsers] = useState([]);

    useEffect(() => {
        console.log("use effect running in FindPeople");
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

    return (
        <div>
            <h1>Find People</h1>
            <div className="new-users">
                <h2>Our newest members</h2>
                <ul>
                    {recentusers.map(item => (
                        <li key={item.id}>
                            <img className="profile-pic" src={item.pic_url} />
                            {item.first_name}
                            {""}
                            {item.last_name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="user-search">
                <h2>Search for friends</h2>
                <ul></ul>
            </div>

            <input
                onChange={e => setNames(e.target.value)}
                type="text"
                name="search_users"
                placeholder="search for another user"
            />
        </div>
    );
}
