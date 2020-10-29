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
            <div className="no-friends">
                {friends.length == 0 && pending.length == 0 && (
                    <div>
                        <h2>You haven't made any connections yet</h2>
                        <p>
                            Click on "Find new friends" at the top of the page
                            to start making friends!
                        </p>
                    </div>
                )}
            </div>
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
                                                unfriend
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
                                                accept
                                            </button>
                                            <button
                                                className="fr-button"
                                                onClick={() =>
                                                    dispatch(unfriend(item.id))
                                                }
                                            >
                                                decline
                                            </button>
                                            <Link to={"/user/" + item.id}>
                                                <button className="fr-button">
                                                    visit profile
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
        </div>
    );
}
