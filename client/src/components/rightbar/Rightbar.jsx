import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from '@mui/icons-material';
import { Follow, Unfollow } from "../../context/AuthAction";

const Rightbar = ({ profile }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // home rightbar
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  // profile rightbar
  const ProfileRightbar = () => {
    const [friends, setFriends] = useState([]);
    const [followed, setFollowed] = useState(currentUser.followings.includes(profile?._id));

    useEffect(() => {
      setFollowed(currentUser.followings.includes(profile?._id));
    }, [currentUser, profile._id]);

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("http://localhost:5000/api/users/friends/" + profile?._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err)
        }
      }
      getFriends();
    }, [profile]);

    const handleClick = async () => {
      try {
        if (followed) {
          await axios.put("http://localhost:5000/api/users/" + profile._id + "/unfollow", {
            userId: currentUser._id
          });
          dispatch(Unfollow(profile._id));
        } else {
          await axios.put("http://localhost:5000/api/users/" + profile._id + "/follow", {
            userId: currentUser._id
          });
          dispatch(Follow(profile._id));
        }
      } catch (err) {
        console.log(err);
      }

      setFollowed(!followed);
    }

    return (
      <>
        {
          currentUser.username !== profile.username && (
            <button className="rightbarFollowButton" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          )
        }
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{profile.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{profile.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {profile.relationship === 1 ? "Single" :
                profile.relationship === 2 ? "Married" : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {
            friends.map(friend => (
              <Link to={`/profile/${friend.username}`} className="link" key={friend._id}>
                <div className="rightbarFollowing">
                  <img
                    src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            ))
          }
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;