import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import {loginCall} from '../../context/authApiCalls';
import { useContext } from "react";
// import {CircularProgress} from "@mui/icons-material"

const Login = () => {
  const [user, setUser] = useState(null);
  const {dispatch, isFetching, } = useContext(AuthContext);
 
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(user, dispatch);
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Mernsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Mernsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input type="email" name="email"
              placeholder="Email"
              className="loginInput"
              required
              onChange={handleChange}
            />
            <input type="password" name="password" 
              placeholder="Password"
              className="loginInput"
              required
              onChange={handleChange}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? "Loading" : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;