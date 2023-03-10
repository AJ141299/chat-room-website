import { createReducer, on } from '@ngrx/store';
import {
  addAnnouncementHelper,
  getNewThemeHelper,
} from 'src/utilities/helpers';
import {
  addAnnouncement,
  addTypingUser,
  receiveMessage,
  removeAnnouncement,
  removeTypingUser,
  sendMessage,
  setConnectedCount,
  changeTheme,
  setTheme,
  loadMessages,
  clearMessages,
} from '../actions/ui.actions';
import { Message, TypingStatus, UiState } from '../models/models';

export const initialState: UiState = {
  theme: 'dark',
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
    recentlySentMessage: message,
  })),
  on(receiveMessage, (state, message: Message) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(loadMessages, (state, {messages}) => ({
    ...state,
    messages: messages,
  })),
  on(clearMessages, (state) => ({
    ...state,
    messages: [],
  })),
  on(setTheme, (state, { theme }) => ({
    ...state,
    theme: theme,
  })),
  on(changeTheme, (state) => ({
    ...state,
    theme: getNewThemeHelper(state.theme),
  })),
  on(addTypingUser, (state, typingStatus: TypingStatus) => ({
    ...state,
    typingUsers: [
      ...state.typingUsers.filter(
        (status) => status.username != typingStatus.username
      ),
      typingStatus,
    ],
  })),
  on(removeTypingUser, (state, typingStatus: TypingStatus) => ({
    ...state,
    typingUsers: state.typingUsers.filter(
      (status) => status.username != typingStatus.username
    ),
  })),
  on(addAnnouncement, (state, { announcement }) => ({
    ...state,
    announcements: addAnnouncementHelper(state.announcements, announcement),
  })),
  on(removeAnnouncement, (state) => ({
    ...state,
    announcements: state.announcements.slice(1, state.announcements.length),
  })),
  on(setConnectedCount, (state, { count }) => ({
    ...state,
    connectedCount: count,
  }))
);
