import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptFriendRequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector(
        state =>
            state.allFriends &&
            state.allFriends.filter(allfriends => allfriends.accepted == true)
    );

    console.log("friends", friends);

    const pending = useSelector(
        state =>
            state.allFriends &&
            state.allFriends.filter(allfriends => allfriends.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    if (!friends && !pending) {
        return null;
    }
    return (
        <div className="all_friends">
            <div className="accepted_friends">
                {friends.length > 0 && (
                    <ul>
                        <h2>Your friends</h2>
                        {friends.map(item => (
                            <li key={item.id}>
                                <img
                                    className="profile-pic"
                                    src={
                                        item.pic_url
                                            ? item.pic_url
                                            : "/default.jpg"
                                    }
                                />
                                {item.first_name} {item.last_name}
                                <button
                                    onClick={() => dispatch(unfriend(item.id))}
                                >
                                    Unfriend
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="pending_friends">
                {pending.length > 0 && (
                    <ul>
                        <h2>Pending friend requests</h2>
                        {pending.map(item => (
                            <li key={item.id}>
                                <img
                                    className="profile-pic"
                                    src={
                                        item.pic_url
                                            ? item.pic_url
                                            : "/default.jpg"
                                    }
                                />
                                {item.first_name} {item.last_name}
                                <button
                                    onClick={() =>
                                        dispatch(acceptFriendRequest(item.id))
                                    }
                                >
                                    Accept Friend Request
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="no_friends">
                {friends.length == 0 && pending.length == 0 && (
                    <div>
                        <h2>You don't have any friends yet</h2>
                        <p>
                            Click on "Search" at the top of the page to start
                            finding new friends!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} //end
