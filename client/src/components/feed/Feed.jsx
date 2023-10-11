import { useContext, useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";
import { publicRequest } from "../../utils/makeRequest";

const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try{
        const res = username
        ? await publicRequest.get("/posts/profile/"+username)
        : await publicRequest.get("/posts/timeline/"+user._id)
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt) 
        }));
      } catch(err) {
        console.log(err)
      }
    }
    getPosts();
  }, [username, user._id]);


  return (
    <div className="feed">
      <div className="feedWrapper">
        {
          (!username || user.username === username )&& <Share />
        }
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;