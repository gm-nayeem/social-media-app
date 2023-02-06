import axios from "axios";
import {
    LoginFailure,
    LoginStart,
    LoginSuccess
} from './AuthAction';


export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredential);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    dispatch(LoginFailure());
  }
};
