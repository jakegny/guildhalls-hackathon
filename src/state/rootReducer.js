import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import contractReducer from "./contract/reducer";

export default combineReducers({
  user: userReducer,
  contract: contractReducer,
});
