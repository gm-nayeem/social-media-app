import "./topbar.css";
import { Search, Person, Chat, Notifications, ArrowDropDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Logout } from '../../context/AuthAction';

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [displayProfile, setDislayProfile] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="link">
          <span className="logo">Mernsocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" className="link">
            <span className="topbarLink">Homepage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          {/* <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div> */}
          <div className="topbarIconItem">
            <Link to="/messenger" className="link">
              <Chat />
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarProfile">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture ? PF + '/upload/' + user.profilePicture : PF + "upload/noAvatar.png"}
              alt="" className="topbarImg" />
          </Link>
          <div className="profile">
            <ArrowDropDown className="arrowIcon" 
              onClick={() => setDislayProfile(!displayProfile)}/>
            <div className="options"
              style={{display: !displayProfile && "none" }}  
            >
              <span>Setting</span>
              <span onClick={() => dispatch(Logout())}>Logout</span>
            </div>
          </div>
        </div>       
      </div>
    </div>
  );
}

export default Topbar;