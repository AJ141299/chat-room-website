import { createReducer, on } from "@ngrx/store";
import { addAnnouncementHelper } from "src/utilities/helpers";
import { addAnnouncement, addTypingUser, receiveMessage, removeAnnouncement, removeTypingUser, sendMessage, setConnectedCount, setTheme } from "../actions/ui.actions";
import { AnnounceType, Message, TypingStatus, UiState } from "../models/models";

export const initialState: UiState = {
  theme: 'light',
  messages: [],
  recentlySentMessage: { username: '', content: '', createdAt: '' },
  typingUsers: [],
  announcements: [],
  connectedCount: 0,
};

export const uiReducer = createReducer(
  initialState,
  on(sendMessage, (state, message: Message) => ({
    ...state,
    messages: [...state.messages, message],
    recentlySentMessage: message
  })),
  on(receiveMessage, (state, message: Message) => ({
    ...state,
    messages: [...state.messages, message]
  })),
  on(setTheme, (state, {theme}) => ({
    ...state,
    theme: theme
  })),
  on(addTypingUser, (state, typingStatus: TypingStatus) => ({
    ...state,
    typingUsers: [...state.typingUsers.filter(
      status => status.username != typingStatus.username),
      typingStatus]
  })),
  on(removeTypingUser, (state, typingStatus: TypingStatus) => ({
    ...state,
    typingUsers: state.typingUsers.filter(status => status.username != typingStatus.username)
  })),
  on(addAnnouncement, (state, {announcement}) => ({
    ...state,
    announcements: addAnnouncementHelper(state.announcements, announcement)
  })),
  on(removeAnnouncement, (state) => ({
    ...state,
    announcements: state.announcements.slice(1, state.announcements.length)
  })),
  on(setConnectedCount, (state, {count}) => ({
    ...state,
    connectedCount: count
  })),
);
