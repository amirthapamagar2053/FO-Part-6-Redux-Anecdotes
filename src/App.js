import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import {
  increaseVoteAction,
  addAnecdoteAction,
} from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(
      increaseVoteAction(anecdotes.find((anecdote) => anecdote.id === id))
    ); //selects the voted anecdote and send it to the action (reducers)
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdotePhrases = event.target.anecdote.value;
    console.log("form app", anecdotePhrases);
    event.target.anecdote.value = "";
    dispatch(addAnecdoteAction(anecdotePhrases));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
