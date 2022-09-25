import { createSlice } from "@reduxjs/toolkit";

let initialState = [];
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filter_Anecdote(state, action) {
      return action.payload.anecdote_filtering.filter((anecdote) =>
        anecdote.content.includes(action.payload.text)
      );
    },
  },
});

export const { filter_Anecdote } = filterSlice.actions;
export default filterSlice.reducer;
