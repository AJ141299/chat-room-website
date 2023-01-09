import { createSelector } from "@ngrx/store";
import { AppState, UserState } from "../models/models";

export const selectUserState = (state: AppState) => state.userState;

export const selectUsername = createSelector(
    selectUserState,
    (state: UserState) => state.username
);

export const selectLoginStatus = createSelector(
  selectUserState,
  (state: UserState) => state.isLoggedIn
);
