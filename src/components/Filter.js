import { useSelector, useDispatch } from "react-redux";
import { filter_Anecdote } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const anecdote_filtering = useSelector((state) => state.anecdote);
  const handleChange = (event) => {
    dispatch(
      filter_Anecdote({ text: event.target.value, anecdote_filtering })
    );
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
