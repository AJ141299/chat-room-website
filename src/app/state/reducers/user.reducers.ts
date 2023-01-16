import { createReducer, on } from "@ngrx/store";
import { updateAvailableUsers, setLoginStatus, setUsername } from "../actions/user.actions";
import { UserState } from "../models/models";

export const initialState: UserState = {
  username: '',
  isLoggedIn: false,
  availableUsers: [],
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
  on(updateAvailableUsers, (state, {usernames}) => ({
    ...state,
    availableUsers: usernames
  }))
);
