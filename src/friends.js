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
        <div className="all-friends">
            <div className="accepted-friends">
                {friends.length > 0 && (
                    <ul>
                        <h2>Your friends</h2>
                        <div className="results-grid">
                            {friends.map(item => (
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
                                                />
                                                <div className="fr-text">
                                                    {item.first_name}{" "}
                                                    {item.last_name}
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="fr-buttons">
                                            <button
                                                className="fr-button"
                                                onClick={() =>
                                                    dispatch(unfriend(item.id))
                                                }
                                            >
                                                Unfriend
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </ul>
                )}
            </div>
            <div className="pending-friends">
                {pending.length > 0 && (
                    <ul>
                        <h2>Pending friend requests</h2>
                        <div className="results-grid">
                            {pending.map(item => (
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
                                                />
                                                <div className="fr-text">
                                                    {item.first_name}{" "}
                                                    {item.last_name}
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="fr-buttons">
                                            <button
                                                className="fr-button"
                                                onClick={() =>
                                                    dispatch(
                                                        acceptFriendRequest(
                                                            item.id
                                                        )
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="fr-button"
                                                onClick={() =>
                                                    dispatch(unfriend(item.id))
                                                }
                                            >
                                                Decline
                                            </button>
                                            <Link to={"/user/" + item.id}>
                                                <button className="fr-button">
                                                    Visit profile
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </div>
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
}
