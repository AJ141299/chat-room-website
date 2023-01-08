import { createAction, props } from '@ngrx/store';
import { Message, TypingStatus } from '../models/models';

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

export const addTypingUser = createAction(
  '[Messages page] Add Typing User to list',
  props<TypingStatus>()
);

export const removeTypingUser = createAction(
  '[Messages page] Remove typing user from list',
  props<TypingStatus>()
);