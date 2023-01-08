import { createReducer, on } from "@ngrx/store";
import { addTypingUser, receiveMessage, removeTypingUser, sendMessage, setTheme } from "../actions/ui.actions";
import { Message, TypingStatus, UiState } from "../models/models";

export const initialState: UiState = {
  theme: 'light',
  messages: [],
  recentlySentMessage: { username: '', content: '', createdAt: '' },
  typingUsers: [],
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
);
