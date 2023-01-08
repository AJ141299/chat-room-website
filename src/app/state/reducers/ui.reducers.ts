import { createReducer, on } from "@ngrx/store";
import { receiveMessage, sendMessage, setTheme } from "../actions/ui.actions";
import { Message, UiState } from "../models/models";

export const initialState: UiState = {
  theme: 'light',
  messages: [],
  recentlySentMessage: {username: '', content: '', createdAt: ''}
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
);
