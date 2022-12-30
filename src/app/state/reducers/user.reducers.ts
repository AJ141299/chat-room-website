import { createReducer, on } from "@ngrx/store";
import { setUsername } from "../actions/user.actions";
import { UserState } from "../models/models";

export const initialState: UserState = {
  username: ''
};

export const userReducer = createReducer(
  initialState,
  on(setUsername, (state, {username}) => ({
    ...state,
    username: username
  })),
);
