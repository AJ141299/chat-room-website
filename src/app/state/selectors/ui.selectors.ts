import { createSelector } from "@ngrx/store";
import { AppState, UiState } from "../models/models";

export const selectUiState = (state: AppState) => state.uiState;

export const selectAllMessages = createSelector(
  selectUiState,
  (state: UiState) => state.messages
);

export const selectRecentlySentMessage = createSelector(
  selectUiState,
  (state: UiState) => state.recentlySentMessage
);

export const selectTheme = createSelector(
  selectUiState,
  (state: UiState) => state.theme
);
