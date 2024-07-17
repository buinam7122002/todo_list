import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdModeEdit } from "react-icons/md";
import { State, useTodoList } from './reducers';
function App() {
  const data: string[] = useTodoList((state: State) => state.name)
  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  const [edit, setEdit] = useState<boolean>(false)
  const [indexEdit, setIndexEdit] = useState<number>()
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
  const handleDeleteTodo = (index: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: index
    })
  }
  const handleEditTodo = (todo: string, index: number) => {
    inputRef.current?.focus()
    setInput(todo)
    setIndexEdit(index)
    setEdit(true)
  }
  const handleUpdate = () => {
    dispatch({
      type: "EDIT_TODO",
      payload: {
        todo: input,
        todoIndex: indexEdit
      }
    })
    setEdit(false)
  }

  return (
    <>
      <input ref={inputRef} value={input} onChange={handleChange} type='text' placeholder='Add todo list' required />
      {!edit ? <button disabled={!input ? true : false} onClick={handleAddTodo}>Add Todo List</button> : <button disabled={!input ? true : false} onClick={handleUpdate}>Save</button>}
      <ul>
        {
          data?.map((todo: string, index: number) => {
            return (
              <li style={{ marginBottom: "24px" }} key={index}>
                <span style={{ minWidth: "80px", display: "inline-block" }}>{todo}</span>
                <button onClick={() => handleDeleteTodo(index)}>X</button>
                <button onClick={() => handleEditTodo(todo, index)}><MdModeEdit /></button>
              </li>
            )
          })
        }
      </ul>
    </>
  );
}

export default App;
