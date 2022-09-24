import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

/* REDUCERS WITHOUT USING REDUCER TOOLKIT
====================================================
// const reducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);
//   switch (action.type) {
//     // Triggers the action for increasing the anecdote votes
//     case "INCREASING_VOTES": {
//       state = state.map((anecdote) => {
//         if (anecdote.id === action.data.id) {
//           //Select the anecdote whose vote is to be increased
//           return { ...anecdote, votes: anecdote.votes + 1 }; //append the incresed voted anecdote to the new state
//         } else {
//           return anecdote;
//         }
//       });
//       return state.sort((a, b) => b.votes - a.votes); //Returns the sorted anecdotes based on the votes
//     }

//     // Triggers the action for adding the anecdote
//     case "ADD_ANECDOTE": {
//       return [...state, asObject(action.data)];
//     }

//     // Triggers the default action
//     default:
//       return state;
//   }
// };
============================================================================
*/

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdoteAction(state, action) {
      return [...state, asObject(action.payload)];
    },

    increaseVoteAction(state, action) {
      state = state.map((anecdote) => {
        if (anecdote.id === action.payload.id) {
          //Select the anecdote whose vote is to be increased
          return { ...anecdote, votes: anecdote.votes + 1 }; //append the incresed voted anecdote to the new state
        } else {
          return anecdote;
        }
      });
      return state.sort((a, b) => b.votes - a.votes); //Returns the sorted anecdotes based on the votes
    },
  },
});

export const { addAnecdoteAction, increaseVoteAction } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

/* ACTION CREATORS
==========================================================
// //Action for increasing the anecdote vote
// export const increaseVoteAction = (votedAnecdoteId) => {
//   return {
//     type: "INCREASING_VOTES",
//     data: votedAnecdoteId,
//   };
// };

// // Action for add the anecdote
// export const addAnecdoteAction = (anecdotePhrases) => {
//   return {
//     type: "ADD_ANECDOTE",
//     data: anecdotePhrases,
//   };
// };
================================================================
*/
// export default reducer;
