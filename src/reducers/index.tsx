import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import axios from "axios"
export interface IToDo {
    id: string,
    todo: string
}
export type State = {
    name: IToDo[]
}
type Actions = {
    getTodo: (url: string) => Promise<void>
    addTodo: (todo: string) => Promise<void>
    deleteTodo: (id: string) => Promise<void>
    editTodo: (update: string, id: string) => Promise<void>
}

export const useTodoList: any = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                name: [],
                getTodo: async (url: string) => {
                    const responsive = await axios.get(url)
                    set({ name: responsive.data })
                },
                addTodo: async (todo: string) => {
                    const responsive = await axios.post("https://6697641b02f3150fb66d6dcf.mockapi.io/api/todo_list/todo_list", {
                        todo: todo
                    })
                    set((state) => ({ name: [...state.name, responsive.data] }))
                },
                deleteTodo: async (id: string) => {
                    const responsive = await axios.delete(`https://6697641b02f3150fb66d6dcf.mockapi.io/api/todo_list/todo_list/${id}`)
                    set((state) => ({ name: state.name.filter((todo: IToDo, index: number) => responsive.data.id !== todo.id) }))
                },
                editTodo: async (update: string, id: string) => {
                    const responsive = await axios.put(`https://6697641b02f3150fb66d6dcf.mockapi.io/api/todo_list/todo_list/${id}`, {
                        todo: update
                    })
                    set((state) => ({
                        name: state.name.map((item: IToDo, index: number) => item.id === id ? item = responsive.data : item)
                    }))
                }
            }),
            { name: 'todoStore' },
        ),
    ),
)
export const { addTodo, deleteTodo, editTodo, getTodo } = useTodoList.getState()
