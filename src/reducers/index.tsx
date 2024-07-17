import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
export type State = {
    name: string[]
}
type Actions = {
    addTodo: (todo: string) => void
    deleteTodo: (todoIndex: number) => void
    editTodo: (todo: string, todoIndex: number) => void
}

export const useTodoList: any = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                name: [],
                addTodo: (todo: string) => set((state) => ({ name: [...state.name, todo] })),
                deleteTodo: (todoIndex: number) => set((state) => ({ name: state.name.filter((_todo, index: number) => todoIndex !== index) })),
                editTodo: (todo: string, todoIndex: number) => set((state) => ({
                    name: state.name.map((item, index) => index === todoIndex ? todo : item)
                })),
            }),
            { name: 'todoStore' },
        ),
    ),
)
export const { addTodo, deleteTodo, editTodo } = useTodoList.getState()
