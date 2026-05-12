import ToDoList from "./components/ToDoList";
import ToastProvider from "./contexts/ToastContext.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import ToDoProvider from "./contexts/ToDoContext.js";
// hooks
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
  return (
    <ThemeProvider theme={theme}>
      <ToDoProvider>
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
            <ToDoList />
          </div>
        </ToastProvider>
      </ToDoProvider>
    </ThemeProvider>
  );
}

export default App;
