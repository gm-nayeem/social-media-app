import { useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from 'axios';

const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const userId = "63e101637eebb91cc53e37b7";

  useEffect(() => {
    const getPosts = async () => {
      try{
        const res = username
        ? await axios.get("http://localhost:5000/api/posts/profile/"+username)
        : await axios.get("http://localhost:5000/api/posts/timeline/"+userId)
        setPosts(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    getPosts();
  }, [username]);


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;