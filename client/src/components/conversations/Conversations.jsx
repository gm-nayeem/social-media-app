import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";
import { publicRequest } from "../../utils/makeRequest";

export default function Conversation({ conversation, currentUser }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await publicRequest.get("/users?userId=" + friendId);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    user?.profilePicture
                        ? PF + '/upload/' + user.profilePicture
                        : PF + "/upload/noAvatar.png"
                }
                alt=""
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}