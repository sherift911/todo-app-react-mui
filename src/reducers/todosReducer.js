import { v4 as uuidv4 } from "uuid";

export default function reducer(currentState, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      // end handles
      const updateTD = [...currentState, newTodo];
      // local storge
      localStorage.setItem("todos", JSON.stringify(updateTD));
      return updateTD;
    }
    case "deleted": {
      const updateTd = currentState.filter((e) => {
        // shortcut
        return e.id !== action.payload.selectedTodo.id;
      });
      localStorage.setItem("todos", JSON.stringify(updateTd));
      return updateTd;
    }
    case "modified": {
      const updatedTodo = currentState.map((e) => {
        if (e.id === action.payload.selectedTodo.id) {
          return {
            ...e,
            title: action.payload.updateTodo.title,
            details: action.payload.updateTodo.details,
          };
        } else {
          return e;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return updatedTodo;
    }
    case "get": {
      const storageTD = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTD;
    }
    case "check": {
      const newTD = currentState.map((e) => {
        if (e.id === action.payload.todo.id) {
          const newTodo = { ...e, isCompleted: !e.isCompleted };
          return newTodo;
        }
        return e;
      });
      localStorage.setItem("todos", JSON.stringify(newTD));
      return newTD;
    }
    default: {
      throw Error(`"unkown error" ${action.type}`);
    }
  }
}
