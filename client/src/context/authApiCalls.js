import {
  LoginFailure,
  LoginStart,
  LoginSuccess
} from './AuthAction';
import { publicRequest } from "../utils/makeRequest";

export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await publicRequest.post("/auth/login", userCredential);
    console.log('res: ', res.data);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    dispatch(LoginFailure());
  }
};
