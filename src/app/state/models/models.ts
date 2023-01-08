export interface AppState {
  userState: UserState;
  uiState: UiState;
}

export interface UserState {
  username: string;
}

export interface UiState {
  theme: string;
  messages: Message[];
  recentlySentMessage: Message;
  typingUsers: TypingStatus[]
  joiningUsers: string[]
}

export interface Message {
  username: string;
  content: string;
  createdAt: string;
}

export interface TypingStatus {
  username: string;
  isTyping: boolean;
}
