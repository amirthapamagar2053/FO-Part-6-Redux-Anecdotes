import { createSlice } from "@reduxjs/toolkit";

let initialState = null;
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set_Notification(state, action) {
      return action.payload.content ? action.payload.content : action.payload;
    },

    remove_Notification(state, action) {
      return action.payload;
    },
  },
});

export const { set_Notification, remove_Notification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
