import { combineReducers } from 'redux';

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";


const rootReducer = combineReducers({
  registration,
  authentication,
  users
});

export default rootReducer;
