import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
export interface IToDo {
    id: string,
    todo: string
}
export type State = {
    name: IToDo[]
}
type Actions = {
    getTodo: (todos: IToDo[]) => void
    addTodo: (todo: IToDo) => void
    deleteTodo: (id: string) => void
    editTodo: (todo: IToDo) => void
}

export const useTodoList: any = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                name: [],
                getTodo: (todos: IToDo[]) => {
                    set({ name: todos })
                },
                addTodo: (todo: IToDo) => {
                    set((state) => ({ name: [...state.name, todo] }))
                },
                deleteTodo: (id: string) => set((state) => ({ name: state.name.filter((todo: IToDo, index: number) => id !== todo.id) })),
                editTodo: (todo: IToDo) => set((state) => ({ name: state.name.map((item: IToDo) => item.id === todo.id ? item = todo : item) }))
            }),
            { name: 'todoStore' },
        ),
    ),
)
export const { addTodo, deleteTodo, editTodo, getTodo } = useTodoList.getState()