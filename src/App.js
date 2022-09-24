import { useSelector, useDispatch } from "react-redux";
import {
  increaseVoteAction,
  addAnecdoteAction,
} from "./reducers/anecdoteReducer";
// import reducer from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(
      increaseVoteAction(anecdotes.find((anecdote) => anecdote.id === id))
    ); //selects the voted anecdote and send it to the action
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdotePhrases = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdoteAction(anecdotePhrases));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
