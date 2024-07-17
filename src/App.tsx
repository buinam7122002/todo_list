import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdModeEdit } from "react-icons/md";
import { IToDo, State, useTodoList } from './reducers';
function App() {
  const data: string[] = useTodoList((state: State) => state.name)
  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  const [edit, setEdit] = useState<boolean>(false)
  const [indexEdit, setIndexEdit] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  const handleAddTodo = () => {
    dispatch({
      type: "ADD_TODO",
      payload: input
    })
    inputRef.current?.focus()
    setInput("")
  }
  const handleDeleteTodo = (id: string) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id
    })
  }
  const handleEditTodo = (todo: IToDo) => {
    inputRef.current?.focus()
    setInput(todo.todo)
    setIndexEdit(todo.id)
    setEdit(true)
  }
  useEffect(() => {
    dispatch({
      type: "GET_TODO",
      payload: "https://6697641b02f3150fb66d6dcf.mockapi.io/api/todo_list/todo_list"
    })
  }, [data])
  const handleUpdate = () => {
    dispatch({
      type: "EDIT_TODO",
      payload: {
        update: input,
        id: indexEdit
      }
    })
    setInput("")
    inputRef.current?.focus()
    setEdit(false)
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
