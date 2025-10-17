import PropTypes from "prop-types";

const Todo = ({ todo, onClickDelete, onClickComplete }) => {
  const doneInfo = (
    <>
      <span>
        This todo is done
        <button onClick={onClickDelete}>Delete</button>
      </span>
    </>
  );

  const notDoneInfo = (
    <>
      <span style={{ display: "flex", gap: "1rem" }}>
        This todo is not done
        <button onClick={onClickDelete}>Delete</button>
        <button onClick={onClickComplete}>Set as done</button>
      </span>
    </>
  );

  return (
    <div
      className="todo"
      style={{ marginTop: "1rem", padding: "1rem", display: "flex", justifyContent: "space-between" }}
    >
      <span>
        {todo.text} 
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  )
};

Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickComplete: PropTypes.func.isRequired,
};

export default Todo;
