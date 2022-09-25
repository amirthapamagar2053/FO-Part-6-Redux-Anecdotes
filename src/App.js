import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import {
  increaseVoteAction,
  addAnecdoteAction,
} from "./reducers/anecdoteReducer";
import {
  set_Notification,
  remove_Notification,
} from "./reducers/notificationReducer";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdote);
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
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
