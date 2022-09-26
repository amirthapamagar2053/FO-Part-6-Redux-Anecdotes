import { createSlice } from "@reduxjs/toolkit";
import anecdoteSerive from "../services/anecdote";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

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
  initialState: [],
  reducers: {
    /* USED FOR WIHTOUT DB.JSON or within defined anecdote array
    ========================================
    // addAnecdoteAction(state, action) {
    //   return [...state, asObject(action.payload)];
    // },
    ==============================================
   */

    //USED FOR THE DB.JSON OR THE RESPONSE FROM THE AXIOS
    addAnecdoteAction(state, action) {
      return [...state, action.payload];
    },

    //USED FOR THE FUNCTIONALITY WITHOUT THUNK
    // ================================================
    // increaseVoteAction(state, action) {
    //   state = state.map((anecdote) => {
    //     console.log("the vote action enterd");
    //     if (anecdote.id === action.payload.id) {
    //       //Select the anecdote whose vote is to be increased
    //       return { ...anecdote, votes: anecdote.votes + 1 }; //append the incresed voted anecdote to the new state
    //     } else {
    //       return anecdote;
    //     }
    //   });
    //   return state.sort((a, b) => b.votes - a.votes); //Returns the sorted anecdotes based on the votes
    // },

    //USED FOR THE FUNCTIONALITY OF THUNK
    // =====================================================
    increaseVoteAction(state, action) {
      const id = action.payload.id;
      const filterState = state.filter((anecdote) => anecdote.id !== id);
      const newState = [...filterState, action.payload];
      return newState.sort((a, b) => b.votes - a.votes); //Returns the sorted anecdotes based on the votes
    },

    // setAnecdote is used for setting the data from the db.json(backend) in store
    setAnecdote(state, action) {
      // return action.payload  //Displays the anectotes in unsorted way
      return action.payload.sort((a, b) => b.votes - a.votes); //Display the anectodes sorted in the amount of votes when refreshing the browser
    },
  },
});

export const { addAnecdoteAction, increaseVoteAction, setAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

//Use of redux thunk to initialize the state
export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteSerive.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteSerive.createNew(content);
    dispatch(addAnecdoteAction(newAnecdote));
  };
};

export const increaseVote = (content) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteSerive.update(content);
    dispatch(increaseVoteAction(updatedAnecdote));
  };
};

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
