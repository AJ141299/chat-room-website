import { ActionReducerMap } from "@ngrx/store";
import { UiEffects } from "./effects/ui.effects";
import { AppState } from "./models/models";
import { uiReducer } from "./reducers/ui.reducers";
import { userReducer } from "./reducers/user.reducers";

export const reducers: ActionReducerMap<AppState> = {
  uiState: uiReducer,
  userState: userReducer
};

export const effects = [UiEffects];
