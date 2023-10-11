import "./online.css";
import { Link } from "react-router-dom";

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Link to={`/profile/${user.username}`} className="link">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={user.profilePicture ? PF + '/upload/' + user.profilePicture : PF + "/upload/noAvatar.png"}
            alt=""
          />
          <span className="rightbarOnline"></span>
        </div>
        <span style={{ textTransform: 'capitalize' }} className="rightbarUsername">{user.username}</span>
      </li>
    </Link>
  );
}

export default Online;