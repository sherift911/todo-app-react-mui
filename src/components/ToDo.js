import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { ToDoContext } from "../contexts/ToDoContext";
//hooks
import { useContext } from "react";
import { useState } from "react";
// style
import "../css/main.css";

// icons
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

// dialog import
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo }) {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const { todos, setTodos } = useContext(ToDoContext);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: "",
  });

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
  }

  function handleDeleteDialog() {
    setShowDelete(true);
  }
  function handleCloseDialog() {
    setShowDelete(false);
  }
  function handleDelete() {
    const updateTd = todos.filter((e) => {
      // if (e.id === todo.id) {
      //   return false;
      // } else {
      //   return true;
      // }

      // shortcut
      return e.id !== todo.id;
    });
    setTodos(updateTd);
    localStorage.setItem("todos", JSON.stringify(updateTd));
  }
  function handleUpdateClick() {
    setShowUpdate(true);
  }
  function handleCloseUpdate() {
    setShowUpdate(false);
  }
  function handleUpdateConfirm() {
    const updatedTodo = todos.map((e) => {
      if (e.id === todo.id) {
        return { ...e, title: updateTodo.title, details: updateTodo.details };
      } else {
        return e;
      }
    });
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    handleCloseUpdate();
  }
  // end event handlers

  return (
    <>
      {/* start delete dialog */}
      <Dialog
        open={showDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من رغبتك فى هذة المهمة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن الحذف فى حال اختيار زر الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            اغلاق
          </Button>
          <Button onClick={handleDelete}>نعم قم بالحذف</Button>
        </DialogActions>
      </Dialog>
      {/* end delete dialog */}
      {/* start update dialog */}
      <Dialog
        open={showUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form id="subscription-form">
              {/* start first input */}
              <TextField
                autoFocus
                required
                margin="dense"
                id="title_1"
                name="details_1"
                label="العنوان"
                type="text"
                fullWidth
                variant="standard"
                value={updateTodo.title}
                onChange={(event) => {
                  setUpdateTodo({ ...updateTodo, title: event.target.value });
                }}
              />
              {/* start first input */}
              {/* start second input */}
              <TextField
                autoFocus
                required
                margin="dense"
                id="title_2"
                name="details_2"
                label="التفاصيل"
                type="text"
                fullWidth
                variant="standard"
                value={updateTodo.details}
                onChange={(event) => {
                  setUpdateTodo({ ...updateTodo, details: event.target.value });
                }}
              />
              {/* end second input */}
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseUpdate}>
            الغاء
          </Button>
          <Button onClick={handleUpdateConfirm}> تعديل </Button>
        </DialogActions>
      </Dialog>
      {/* end update dialog */}
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
              <IconButton className="icon-button" onClick={handleUpdateClick}>
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
              <IconButton className="icon-button" onClick={handleDeleteDialog}>
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
