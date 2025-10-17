import React from 'react'
import Proptypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <React.Fragment key={todo._id}>
          <div style={{ maxWidth: '70%', margin: 'auto' }}>
            <Todo
              todo={todo}
              onClickDelete={() => deleteTodo(todo)}
              onClickComplete={() => completeTodo(todo)}
          />
          </div>
          {index < todos.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </>
  );
};

TodoList.propTypes = {
  todos: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.string.isRequired,
      text: Proptypes.string.isRequired,
      done: Proptypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: Proptypes.func.isRequired,
  completeTodo: Proptypes.func.isRequired,
};

export default TodoList;
