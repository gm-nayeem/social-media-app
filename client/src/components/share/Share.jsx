import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { publicRequest } from "../../utils/makeRequest";

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      // upload file
      try{
        await publicRequest.post("/upload", data);
      } catch(err) {
        console.log(err);
      }
    }
    
    // upload post
    try{
      await axios.post("http://localhost:5000/api/posts", newPost);
      window.location.reload();
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`/profile/${user.username}`}>
            <img
              className="shareProfileImg"
              src={user.profilePicture ? PF + '/upload/' + user.profilePicture : PF + "/upload/noAvatar.png"} alt="" />
          </Link>
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput" ref={desc} />
        </div>
        <hr className="shareHr" />
        {
          file && (
            <div className="shareImgContainer">
              <img src={URL.createObjectURL(file)} alt="" className="shareImg"/>
              <Cancel className="shareCancel" onClick={() => setFile(null)}/>
            </div>
          )
        }
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input type="file" id="file" accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleSubmit}>Share</button>
        </div>
      </div>
    </div>
  );
}

export default Share;