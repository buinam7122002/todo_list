import React, { useEffect, useRef, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { getTodo, IToDo } from './reducers';
import { useCreateTodoList, useDeleteTodoList, useEditTodoList, useGetTodoList } from './hook';
function App() {
  const { data, error, isError, isLoading } = useGetTodoList()
  const addTodoList = useCreateTodoList()
  const deleteTodoList = useDeleteTodoList()
  const editToDoList = useEditTodoList()
  const [input, setInput] = useState("")
  const [edit, setEdit] = useState<boolean>(false)
  const [indexEdit, setIndexEdit] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  const handleAddTodo = () => {
    addTodoList.mutate(input)
    inputRef.current?.focus()
    setInput("")
  }
  const handleDeleteTodo = (id: string) => {
    deleteTodoList.mutate(id)
  }
  const handleEditTodo = (todo: IToDo) => {
    inputRef.current?.focus()
    setInput(todo.todo)
    setIndexEdit(todo.id)
    setEdit(true)
  }
  const handleUpdate = () => {
    editToDoList.mutate({
      todo: input,
      id: indexEdit
    })
    setInput("")
    inputRef.current?.focus()
    setEdit(false)
  }
  useEffect(() => {
    getTodo(data)
  }, [data])
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (isError) {
    return <div>Đã xảy ra lỗi: {error?.message}</div>;
  }
  return (
    <>
      <input ref={inputRef} value={input} onChange={handleChange} type='text' placeholder='Add todo list' required />
      {!edit ? <button disabled={!input ? true : false} onClick={handleAddTodo}>Add Todo List</button> : <button disabled={!input ? true : false} onClick={handleUpdate}>Save</button>}
      <ul>
        {
          data?.map((todo: any, index: number) => {
            return (
              <li style={{ marginBottom: "24px" }} key={todo.id}>
                <span style={{ minWidth: "80px", display: "inline-block" }}>{todo.todo}</span>
                <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
                <button onClick={() => handleEditTodo(todo)}><MdModeEdit /></button>
              </li>
            )
          })
        }
      </ul>
    </>
  );
}

export default App;
