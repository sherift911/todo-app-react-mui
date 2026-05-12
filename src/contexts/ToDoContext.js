import { createContext, useReducer, useContext } from "react";
import todosReducer from "../reducers/todosReducer.js";

export const ToDoContext = createContext([]);

const ToDoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <ToDoContext.Provider value={{ todos: todos, dispatch: dispatch }}>
      {children}
    </ToDoContext.Provider>
  );
};
export const useTodos = () => {
  return useContext(ToDoContext);
};
export default ToDoProvider;
