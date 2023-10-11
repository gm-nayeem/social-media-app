import "./closeFriend.css";

const CloseFriend = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img 
        className="sidebarFriendImg" 
        src={user.profilePicture ? PF + '/upload/' +user.profilePicture : PF+"/upload/noAvatar.png"}
        alt="" 
      />
      <span style={{textTransform: 'capitalize'}} className="sidebarFriendName">{user.username}</span>
    </li>
  );
}

export default CloseFriend;