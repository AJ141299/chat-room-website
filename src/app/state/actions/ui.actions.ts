import { createAction, props } from '@ngrx/store';
import { Announcement, Message, TypingStatus } from '../models/models';

export const sendMessage = createAction(
  '[Messages page] Send Message',
  props<Message>()
);

export const receiveMessage = createAction(
  '[Messages page] Receive Message',
  props<Message>()
);

export const setTheme = createAction(
  '[All pages] Set Theme',
  props<{theme: string}>()
);

export const changeTheme = createAction(
  '[All pages] Change Theme'
);

export const addTypingUser = createAction(
  '[Messages page] Add Typing User to list',
  props<TypingStatus>()
);

export const removeTypingUser = createAction(
  '[Messages page] Remove typing user from list',
  props<TypingStatus>()
);

export const addAnnouncement = createAction(
  '[User details page] Add announcement',
  props<{announcement: Announcement}>()
);

export const removeAnnouncement = createAction(
  '[User details page] Remove announcement'
);

export const setConnectedCount = createAction(
  '[Messages page] Set connected users count',
  props<{count: number}>()
);
