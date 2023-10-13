import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { publicRequest } from "../../utils/makeRequest";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get("/users?username=" + username);
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + '/upload/' + user.coverPicture : PF + '/upload/' + "noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF + '/upload/' + user.profilePicture : PF + "upload/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <b className="profileInfoName">{user.username}</b>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar profile={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;