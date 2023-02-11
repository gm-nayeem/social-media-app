import "./message.css";
import { format } from "timeago.js";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  // get user for profilePicture
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users?userId=" + message?.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [message])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={user?.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}