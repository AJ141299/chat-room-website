import { createReducer, on } from "@ngrx/store";
import { setLoginStatus, setUsername } from "../actions/user.actions";
import { UserState } from "../models/models";

export const initialState: UserState = {
  username: '',
  isLoggedIn: false,
};

export const userReducer = createReducer(
  initialState,
  on(setUsername, (state, {username}) => ({
    ...state,
    username: username
  })),
  on(setLoginStatus, (state, {status}) => ({
    ...state,
    isLoggedIn: status
  })),
);
