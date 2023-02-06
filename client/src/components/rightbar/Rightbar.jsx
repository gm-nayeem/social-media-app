import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";


const Rightbar = ({ profile }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF+"gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF+"ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
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
          <div className="rightbarFollowing">
            <img
              src={PF+"person/katherine.jpg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Katherine</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF+"person/katrina.jpg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Katrina</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF+"person/deepika.jpg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Deepika</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF+"person/urvashi.jpg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Urvashi</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF+"person/shilpa.jpg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Shilpa</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF+"person/priyanka.jpg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Priyanka</span>
          </div>
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