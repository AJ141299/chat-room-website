export interface AppState {
  userState: UserState;
  uiState: UiState;
}

export interface UserState {
  username: string;
  isLoggedIn: boolean;
  availableUsers: string[]
}

export interface UiState {
  theme: string;
  messages: Message[];
  recentlySentMessage: Message;
  typingUsers: TypingStatus[];
  announcements: Announcement[];
  connectedCount: number;
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

export interface Announcement {
  username: string;
  type: AnnounceType;
}

export enum AnnounceType {
  Joined,
  Left
}
