import React from "react";
import ReactDOM from "react-dom/client";
// import { createStore } from "redux"; //Used because of no presence of reduce toolkit
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// import reducer from "./reducers/anecdoteReducer"; //Used because of no presence of reduce toolkit

// const store = createStore(reducer) //Used because of no presence of reduce toolkit

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
