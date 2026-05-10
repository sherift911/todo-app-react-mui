import ToDoList from "./components/ToDoList";
import { ToastContext } from "./contexts/ToastContext.js";
import ToastProvider from "./contexts/ToastContext.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";
import { ToDoContext } from "./contexts/ToDoContext";
// hooks
import { useState } from "react";

// style
import "./css/main.css";

//others
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  status: {
    danger: red[500],
  },
  typography: {
    fontFamily: ["myFont"],
  },
  palette: {
    primary: {
      main: "#f50057",
    },
  },
});

// todo data
const initialTodo = [
  {
    id: uuidv4(),
    title: "المهمة الاولى",
    details: "تفاصيل المهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الاولى",
    details: "تفاصيل المهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الاولى",
    details: "تفاصيل المهمة الاولى",
    isCompleted: false,
  },
];

function App() {
  // states
  const [todos, setTodos] = useState(initialTodo);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#000000e0",
            direction: "rtl",
          }}
        >
          <ToDoContext.Provider value={{ todos: todos, setTodos: setTodos }}>
            <ToDoList />
          </ToDoContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
