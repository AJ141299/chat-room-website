import { createAction, props } from '@ngrx/store';
import { Message } from '../models/models';

export const sendMessage = createAction(
  '[Messages page] Send Message',
  props<Message>()
);

export const receiveMessage = createAction(
  '[Messages page] Receive Message',
  props<Message>()
);
