import React, { useState, useEffect } from "react";
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
            <p>HOLDING TEXT: return from FindPeople</p>
            <ul>
                {recentusers.map(recentusers => (
                    <li>
                        {first}
                        {last}
                    </li>
                ))}
            </ul>
            {/* <input
                onChange={e => setNames(e.target.value)}
                type="text"
                name="search_users"
                placeholder="search for another user"
            /> */}
        </div>
    );
}
