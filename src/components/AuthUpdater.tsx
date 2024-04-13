import React from "react";
import { setAuthState } from "@/store/authSlice";
import { useAppDispatch } from "@/store";
const AuthUpdater = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <button onClick={() => dispatch(setAuthState(true))}>Log in</button>
      <button onClick={() => dispatch(setAuthState(false))}>Log out</button>
    </div>
  );
};
export default AuthUpdater;
