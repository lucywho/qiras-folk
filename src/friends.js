import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptFriendRequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    // const friends = useSelector(
    //     state =>
    //         state.friends &&
    //         state.friends
    //             .filter
    //             //friend => something.something == something
    //             ()
    // );

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    //need another dispatch to get pending friends?

    // if (!friends) {
    //     return null;
    // }

    return (
        <div className="pending_friends">
            <h2>HOLDING TEXT: friends component</h2>
            {/* <div>
                <ul>
                    <h2>Your friends</h2>
                    {friends.map(item => (
                        <li key={item.id}>
                            <img
                                className="profile-pic"
                                src={
                                    item.pic_url ? item.pic_url : "/default.jpg"
                                }
                            />
                            {item.first_name} {item.last_name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    <h2>Pending friend requests</h2>
                    {pendingfriends.map(item => (
                        <li key={item.id}>
                            <img
                                className="profile-pic"
                                src={
                                    item.pic_url ? item.pic_url : "/default.jpg"
                                }
                            />
                            {item.first_name} {item.last_name}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
} //end
