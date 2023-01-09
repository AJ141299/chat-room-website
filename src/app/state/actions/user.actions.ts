import { createAction, props } from '@ngrx/store';

export const setUsername = createAction(
  '[Signup page] Set Username',
  props<{username: string}>()
);

export const setLoginStatus = createAction(
  '[All pages] Sets logged in status',
  props<{status: boolean}>()
);

export const logout = createAction(
  '[All pages] Log user out'
);
