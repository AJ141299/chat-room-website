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

export const selectTypingUsers = createSelector(
  selectUiState,
  (state: UiState) => state.typingUsers
);

export const selectAnnouncements = createSelector(
  selectUiState,
  (state: UiState) => state.announcements
);

export const selectConnectedCount = createSelector(
  selectUiState,
  (state: UiState) => state.connectedCount
);
