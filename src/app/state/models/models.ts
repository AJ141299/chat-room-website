export interface AppState {
  userState: UserState;
  uiState: UiState;
}

export interface UserState {
  username: string;
}

export interface UiState {
  messages: Message[];
  recentlySentMessage: Message;
}

export interface Message {
  username: string;
  content: string;
  createdAt: string;
}
