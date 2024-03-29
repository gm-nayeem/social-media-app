import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import { publicRequest } from "../../utils/makeRequest";


const Post = ({ post }) => {
  const [like,setLike] = useState(post.likes.length);
  const [isLiked,setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user: currentUser} = useContext(AuthContext);

  // public folder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const getUser = async () => {
      try{
        const res = await publicRequest.get("/users?userId="+post.userId);
        setUser(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    getUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try{
      await publicRequest.put(`/posts/${post._id}/like`, {userId: currentUser._id})
    } catch(err) {
      console.log(err)
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ? PF + '/upload/' +user.profilePicture : PF+"/upload/noAvatar.png"}
              alt=""
            />
            </Link>
            <span className="postUsername">
              {user?.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+'/upload/'+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF+"like.png" } onClick={likeHandler} alt="" />
            <img className="likeIcon" src={PF+"heart.png"}  onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;