import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";
import { publicRequest } from "../../utils/makeRequest";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await publicRequest.get("/users/friends/" + currentId);
            setFriends(res.data);
        };

        getFriends();
    }, [currentId]);


    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await publicRequest.get(
                `/conversations/find/${currentId}/${user._id}`
            );
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={
                                o?.profilePicture
                                    ? PF + '/upload/' + o.profilePicture
                                    : PF + "/upload/noAvatar.png"
                            }
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    );
}