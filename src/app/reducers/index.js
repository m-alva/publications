import { combineReducers } from 'redux';

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { publications } from "./publications.reducer";


const rootReducer = combineReducers({
  registration,
  authentication,
  users,
  publications,
});

export default rootReducer;
