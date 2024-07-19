import React, { useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IToDo, State, useTodoList } from "./reducers";
import { TiTick } from "react-icons/ti";
import { useCreateTodoList, useDeleteTodoList, useEditTodoList, useGetTodoList } from "./hook";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Tooltip from "@mui/material/Tooltip";
import Search from "./feature/search";
function App() {
  const { error, isError, isLoading } = useGetTodoList();
  const data = useTodoList((state: State) => state.name);
  const addTodoList = useCreateTodoList();
  const deleteTodoList = useDeleteTodoList();
  const editToDoList = useEditTodoList();
  const [input, setInput] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const nowDate = new Date();
  const [indexEdit, setIndexEdit] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [expiredDate, setExpireDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };
  const handleAddTodo = () => {
    if (expiredDate && expiredDate.getTime() > nowDate.getTime()) {
      addTodoList.mutate({
        todo: input,
        status: "doing",
        expiredDate,
        createdAt: new Date(),
      });
      inputRef.current?.focus();
      setInput("");
    } else {
      alert("expiredDate must be greater than nowDate");
    }
  };
  const handleDeleteTodo = (id: string) => {
    deleteTodoList.mutate(id);
  };
  const handleDoneTodo = (todo: IToDo) => {
    const updatedTodo: IToDo = { ...todo, status: "done" };
    editToDoList.mutate(updatedTodo);
  };
  const handleEditTodo = (todo: IToDo) => {
    inputRef.current?.focus();
    setInput(todo.todo);
    setCurrentStatus(todo.status);
    setIndexEdit(todo.id ? todo.id : "");
    setEdit(true);
  };
  const handleUpdate = () => {
    if (expiredDate && expiredDate.getTime() > nowDate.getTime()) {
      editToDoList.mutate({
        todo: input,
        id: indexEdit,
        expiredDate,
        updatedAt: new Date(),
        status: currentStatus,
      });
      setInput("");
      inputRef.current?.focus();
      setEdit(false);
    } else {
      alert("expiredDate must be greater than nowDate");
    }
  };
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (isError) {
    return <div>Đã xảy ra lỗi: {error?.message}</div>;
  }
  return (
    <>
      <Search />
      <div style={{ position: "relative", top: "54px", right: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label='Set Expire Date'
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              onChange={(newValue) => {
                setExpireDate(newValue?.toDate() || null);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <input style={{ padding: "16.5px 14px", minWidth: "150px", borderRadius: "4px" }} ref={inputRef} value={input} onChange={handleChange} type='text' placeholder='Add todo list' required />
      {!edit ? (
        <button style={!input || !expiredDate ? { opacity: "0.7" } : { opacity: 1 }} disabled={!input || !expiredDate ? true : false} onClick={handleAddTodo}>
          Add Todo List
        </button>
      ) : (
        <button disabled={!input ? true : false} onClick={handleUpdate}>
          Save
        </button>
      )}
      <ul>
        {data?.map((todo: IToDo) => {
          return (
            <Tooltip
              sx={{ minWidth: "400px" }}
              key={todo.id}
              title={
                <ul style={{ borderRadius: "4px", fontSize: "16px", marginTop: "20px", minWidth: "316px", minHeight: "108px", padding: "10px 0px 0px 20px" }}>
                  <li>Name: {todo.todo}</li>
                  <li style={{ marginTop: "20px" }}>
                    CreateAt:{" "}
                    {new Date(todo.createdAt ? todo.createdAt : new Date()).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </li>
                  <li style={{ marginTop: "20px" }}>
                    ExpiredDate:{" "}
                    {todo.expiredDate
                      ? new Date(todo.expiredDate).toLocaleString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
                      : ""}
                  </li>
                  <li style={{ marginTop: "20px" }}>Status: {todo.status}</li>
                  <button onClick={() => handleDoneTodo(todo)} style={todo.status === "doing" ? { marginTop: "20px" } : { display: "none" }}>
                    {" "}
                    Done
                  </button>
                </ul>
              }>
              <li style={{ marginBottom: "24px" }}>
                <span style={{ minWidth: "100px", display: "inline-block" }}>
                  <b
                    style={
                      todo.status !== "expired"
                        ? { minWidth: "120px", display: "inline-block" }
                        : { textDecoration: "line-through", textDecorationColor: "red", minWidth: "120px", display: "inline-block" }
                    }>
                    {" "}
                    {todo.todo}
                  </b>
                </span>
                <span> {todo.status === "done" ? <TiTick style={{ color: "green", fontSize: "24px" }} /> : ""}</span>
                <button onClick={() => handleDeleteTodo(todo.id ? todo.id : "1")}>X</button>
                <button onClick={() => handleEditTodo(todo)}>
                  <MdModeEdit />
                </button>
              </li>
            </Tooltip>
          );
        })}
      </ul>
    </>
  );
}

export default App;
