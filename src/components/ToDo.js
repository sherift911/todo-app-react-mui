import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ToDoContext } from "../contexts/ToDoContext";
import { ToastContext } from "../contexts/ToastContext.js";
//hooks
import { useContext } from "react";
import { useState } from "react";
// style
import "../css/main.css";

// icons
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

export default function ToDo({ todo, showDelete, selectedTodo, showUpdate }) {
  const { todos, setTodos } = useContext(ToDoContext);
  const { toastFn } = useContext(ToastContext);

  // start event handlers
  function hanleClickCheck() {
    const newTD = todos.map((e) => {
      if (e.id === todo.id) {
        e.isCompleted = !e.isCompleted;
      }
      return e;
    });
    setTodos(newTD);
    localStorage.setItem("todos", JSON.stringify(newTD));
    toastFn("تم التعديل بنجاح");
  }

  function handleDeleteDialog(todo) {
    selectedTodo(todo);
    showDelete(true);
  }

  function handleUpdateClick(todo) {
    selectedTodo(todo);
    showUpdate(true);
  }

  // end event handlers

  return (
    <>
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          marginTop: "30px",
          color: "white",
          boxShadow: "-3px 4px 8px black",
        }}
      >
        <CardContent>
          {/* start todo */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 8 }} style={{}}>
              <Typography
                className="title"
                variant="h5"
                sx={{
                  textAlign: "start",
                  fontWeight: "normal",
                  padding: "10px",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  opacity: todo.isCompleted ? "0.6" : "1",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                className="details"
                variant="h6"
                sx={{
                  textAlign: "start",
                  fontWeight: "normal",
                  padding: "10px",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/* end todo */}
            {/* start action buttons */}
            <Grid
              className="icons-box"
              size={{ xs: 6, md: 4 }}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              {/* start check button */}
              <IconButton
                className="icon-button"
                onClick={() => {
                  hanleClickCheck();
                }}
              >
                <CheckIcon
                  className="icon"
                  style={{
                    border: "2px solid green",
                    borderRadius: "50%",
                    padding: "5px",
                    // start dynamic color
                    color: todo.isCompleted ? "white" : "green",
                    // end dynamic color
                    // start dynamic color
                    backgroundColor: todo.isCompleted ? "green" : "white",
                    // end dynamic color
                    fontSize: "35px",
                    boxShadow: "black -2px 1px 6px",
                  }}
                />
              </IconButton>
              {/* end check button */}
              {/* start modified button */}
              <IconButton
                className="icon-button"
                onClick={() => handleUpdateClick(todo)}
              >
                <CreateIcon
                  className="icon"
                  style={{
                    border: "2px solid blue",
                    borderRadius: "50%",
                    padding: "5px",
                    color: "blue",
                    backgroundColor: "white",
                    fontSize: "35px",
                    boxShadow: "black -2px 1px 6px",
                  }}
                />
              </IconButton>
              {/* end modified button */}
              {/* start delete button */}
              <IconButton
                className="icon-button"
                onClick={() => handleDeleteDialog(todo)}
              >
                <DeleteIcon
                  className="icon"
                  style={{
                    border: "2px solid red",
                    borderRadius: "50%",
                    padding: "5px",
                    color: "red",
                    backgroundColor: "white",
                    fontSize: "35px",
                    boxShadow: "black -2px 1px 6px",
                  }}
                />
              </IconButton>
              {/* end delete button */}
            </Grid>
            {/* end action buttons */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
