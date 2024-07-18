import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodoList, deleteTodoList, eidtTodoList, getTodoList } from "../fetch";
import { addTodo, deleteTodo, editTodo, IToDo } from "../reducers";
const useGetTodoList = () => {
    return useQuery({
        queryKey: ["todo"],
        queryFn: () => getTodoList(),
    })
}
const useCreateTodoList = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (todo: string) => createTodoList(todo),
        onSuccess: (data) => {
            addTodo(data)
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        }
    })
    return mutation
}
const useDeleteTodoList = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id: string) => deleteTodoList(id),
        onSuccess: (data) => {
            deleteTodo(data)
            queryClient.invalidateQueries({ queryKey: ["todo"] })
        }
    })
    return mutation
}
const useEditTodoList = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (todo: IToDo) => eidtTodoList(todo.todo, todo.id),
        onSuccess: (data) => {
            editTodo(data)
            queryClient.invalidateQueries({ queryKey: ["todo"] })
        }
    })
    return mutation
}
export {
    useGetTodoList,
    useCreateTodoList,
    useDeleteTodoList,
    useEditTodoList
}