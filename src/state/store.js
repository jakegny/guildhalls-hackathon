import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./rootReducer";

const initialstate = {};

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function getStore() {
  let store = createStore(
    // persistedReducer,
    rootReducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
