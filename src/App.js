import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import anecdoteSerive from "./services/anecdote";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import {
  increaseVoteAction,
  addAnecdoteAction,
  initializeAnecdote,
  //setAnecdote, //commented out beacasue of use of redux-thunk
} from "./reducers/anecdoteReducer";
import {
  set_Notification,
  remove_Notification,
} from "./reducers/notificationReducer";

const App = () => {
  //the useeffect is to get the data from the db.json and is send to the reducer through action creator and is stored in store
  // useEffect(() => {
  //   anecdoteSerive.getAll().then((anecdote) => dispatch(setAnecdote(anecdote)));
  // }, []);

  //the useeffect is to get the data from the db.json and is send to the reducer through action creator and is stored in store through the redux-thunk
  useEffect(() => {
    dispatch(initializeAnecdote());
  }, []);

  const anecdotes = useSelector((state) => {
    if (state.filter.length === 0) {
      return state.anecdote;
    } else {
      return state.filter;
    }
  });
  const dispatch = useDispatch();
  const vote = (id) => {
    console.log("vote", id);
    dispatch(
      increaseVoteAction(anecdotes.find((anecdote) => anecdote.id === id))
    ); //selects the voted anecdote and send it to the action (reducers)
    dispatch(
      set_Notification(anecdotes.find((anecdote) => anecdote.id === id)) //selects the voted anecdote and send it to the action (reducers)
    );
    setTimeout(() => {
      dispatch(remove_Notification(""));
    }, 5000);
  };

  /*FUNTION USED FOR WITHOUT BACKEND OR AXIOS -- DB.JSON
  ============================================================
  // const addAnecdote = (event) => {
  //   event.preventDefault();
  //   const anecdotePhrases = event.target.anecdote.value;
  //   event.target.anecdote.value = "";
  //   dispatch(addAnecdoteAction(anecdotePhrases));
  //   dispatch(set_Notification(anecdotePhrases));
  //   setTimeout(() => {
  //     dispatch(remove_Notification(""));
  //   }, 5000);
  // };
  */

  /*
  //USED WITH AXIOS
  // =============================================
  // const addAnecdote = async (event) => {
  //   event.preventDefault();
  //   const anecdotePhrases = event.target.anecdote.value;
  //   event.target.anecdote.value = "";
  //   const newAnecdote = await anecdoteSerive.createNew(anecdotePhrases);
  //   dispatch(addAnecdoteAction(newAnecdote));
  //   dispatch(set_Notification(anecdotePhrases));
  //   setTimeout(() => {
  //     dispatch(remove_Notification(""));
  //   }, 5000);
  // };
  */

  //This was resued with the help of redux-thunk
  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdotePhrases = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdoteAction(anecdotePhrases));
    dispatch(set_Notification(anecdotePhrases));
    setTimeout(() => {
      dispatch(remove_Notification(""));
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
