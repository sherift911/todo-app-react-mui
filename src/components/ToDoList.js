import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import "../css/main.css";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import { ToastContext } from "../contexts/ToastContext.js";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTodos } from "../contexts/ToDoContext";
import { ToDoContext } from "../contexts/ToDoContext";
//others
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";
// hooks
import { useState, useContext, useEffect, useMemo } from "react";
//theme
// dialog import
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

export default function ToDoList() {
  // custom hook reducer data
  const { todos, dispatch } = useTodos(ToDoContext);

  // start states
  const [titleInput, setTitleInput] = useState("");
  const [todosType, setTodosType] = useState("all");
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({ title: "", details: "" });
  const [updateTodo, setUpdateTodo] = useState({
    title: selectedTodo.title,
    details: "",
  });
  useEffect(() => {
    setUpdateTodo({ title: selectedTodo.title, details: "" });
  }, [selectedTodo]);
  const { toastFn } = useContext(ToastContext);
  // end states

  // send setShowDelete
  function sendShowDelete() {
    setShowDelete(true);
  }
  // send selectedTodo
  function selectedTodoSend(todo) {
    setSelectedTodo(todo);
  }
  // send show update
  function ShowUpdateSend() {
    setShowUpdate(true);
  }
  // start filteration arrays
  // start completedArray
  const completedArray = useMemo(() => {
    return todos.filter((e) => {
      return e.isCompleted !== false;
    });
  }, [todos]);
  // end completedArray
  // start not completedArray
  const notCompletedArray = useMemo(() => {
    return todos.filter((e) => {
      return e.isCompleted !== true;
    });
  }, [todos]);
  // end not completedArray
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
    return (
      <ToDo
        key={e.id}
        todo={e}
        showDelete={sendShowDelete}
        selectedTodo={selectedTodoSend}
        showUpdate={ShowUpdateSend}
      />
    );
  });
  // render
  //end render data
  // start handles
  function handleAddClick() {
    dispatch({ type: "added", payload: { title: titleInput } });
    setTitleInput("");
    toastFn("تمت الاضافة بنجاح");
  }
  // start get data from localStorage
  // start useEffect
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);
  // end useEffects
  // end get data from localStorage
  function typeChange(event) {
    setTodosType(event.target.value);
  }
  const theme = useTheme();
  function handleCloseDialog() {
    setShowDelete(false);
  }
  function handleDelete() {
    handleCloseDelete();
    toastFn("تم الحذف بنجاح");
    dispatch({ type: "deleted", payload: { selectedTodo: selectedTodo } });
  }
  function handleCloseUpdate() {
    setShowUpdate(false);
  }
  function handleCloseDelete() {
    setShowDelete(false);
  }
  function handleUpdateConfirm() {
    handleCloseUpdate();
    toastFn("تم التعديل بنجاح");
    dispatch({ type: "modified", payload: { selectedTodo, updateTodo } });
  }

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
    </>
  );
}
