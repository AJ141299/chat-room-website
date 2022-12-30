import { createAction, props } from '@ngrx/store';

export const setUsername = createAction(
  '[Signup page] Set Username',
  props<{username: string}>()
);
