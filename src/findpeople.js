import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [names, setNames] = useState([]);

    useEffect(() => {
        console.log("use effect running in FindPeople", this.state);
        //let abort;

        // axios
        //     .get(`/users`, this.state)
        //     .then(response => {
        //         console.log("get users response.data:", response.data);

        //         if (!abort) {
        //             setNames(response.data);
        //         }

        //         //abort = true;
        //     })
        //     .catch(err => {
        //         console.log("catch error in get users", err);
        //     });
    });

    return (
        <div>
            <p>return from FindPeople</p>
            {/* <ul>
                {names.map(first => (
                    <li key={id}>
                        {first}
                        {last}
                    </li>
                ))}
            </ul>
            <input
                onChange={e => setNames(e.target.value)}
                type="text"
                name="search_users"
                placeholder="search for another user"
            /> */}
        </div>
    );
}
