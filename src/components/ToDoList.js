import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import "../css/main.css";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToDoContext } from "../contexts/ToDoContext";
//others
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";

// hooks
import { useState, useContext, useEffect } from "react";
//theme

export default function ToDoList() {
  //data
  const { todos, setTodos } = useContext(ToDoContext);

  // start states
  const [titleInput, setTitleInput] = useState("");
  const [todosType, setTodosType] = useState("all");
  // end states
  // start filteration arrays
  const completedArray = todos.filter((e) => {
    return e.isCompleted !== false;
  });
  const notCompletedArray = todos.filter((e) => {
    return e.isCompleted !== true;
  });
  // end filteration arrays
  //start render data
  let toBeRender = todos;
  if (todosType === "completed") {
    toBeRender = completedArray;
  } else if (todosType === "non_completed") {
    toBeRender = notCompletedArray;
  } else {
    toBeRender = todos;
  }
  // render
  const todoList = toBeRender.map((e) => {
    return <ToDo key={e.id} todo={e} />;
  });
  // render
  //end render data
  // start handles
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    // end handles
    const updateTD = [...todos, newTodo];
    setTodos(updateTD);
    // local storge
    // storing new array without useEffect
    localStorage.setItem("todos", JSON.stringify(updateTD));
    setTitleInput("");
  }
  // start get data from localStorage
  // start useEffect
  useEffect(() => {
    console.log("useEffect test");
    const storageTD = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTD);
  }, []);
  // end useEffects
  // end get data from localStorage
  function typeChange(event) {
    setTodosType(event.target.value);
  }
  const theme = useTheme();
  return (
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography
            variant="h1"
            sx={{
              fontSize: "60px",
              marginBottom: "-10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            مهامي
          </Typography>
          <Divider
            variant="middle"
            style={{ height: "2px", backgroundColor: "gray" }}
          />
          {/* start buttons */}
          <ToggleButtonGroup
            value={todosType}
            exclusive
            onChange={typeChange}
            aria-label="text alignment"
            style={{
              marginTop: "35px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              direction: "ltr",
            }}
            color="primary"
          >
            <ToggleButton
              value="non_completed"
              style={{
                borderLeft: "1px solid black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              غير منجز
            </ToggleButton>
            <ToggleButton
              value="completed"
              style={{
                borderLeft: "1px solid black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              منجز
            </ToggleButton>
            <ToggleButton
              value="all"
              style={{
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              الكل
            </ToggleButton>
          </ToggleButtonGroup>
          {/* end buttons */}
          {/* start todos */}
          {todoList}
          {/* end todos */}
          {/* start input + Add button */}
          <Grid container spacing={3} sx={{ marginTop: "25px" }}>
            <Grid size={9} style={{}}>
              <TextField
                style={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(event) => {
                  setTitleInput(event.target.value);
                }}
                color="primary"
              />
            </Grid>
            <Grid size={3} style={{}}>
              <Button
                className="addButton"
                variant="contained"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "6px",
                  fontSize: "14px",
                  backgroundColor: theme.palette.primary.main,
                }}
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length <= 0 ? true : false}
              >
                اضـــــــافة
              </Button>
            </Grid>
          </Grid>
          {/* end input + Add button */}
        </CardContent>
      </Card>
    </Container>
  );
}
