import axios from "axios"
import { getTodo, IToDo } from "../reducers"
const url: string = "https://6697641b02f3150fb66d6dcf.mockapi.io/api/todo_list/todo_list"
const createTodoList = async (todo: IToDo) => {
    try {
        const responsive = await axios.post(url, todo)
        return responsive.data
    } catch (error) {
        console.log(error)
    }
}
const eidtTodoList = async (todo: IToDo) => {
    try {
        const responsive = await axios.put(`${url}/${todo.id}`, todo)
        return responsive.data
    } catch (error) {
        console.log(error)
    }
}
const deleteTodoList = async (id: string) => {
    try {
        const responsive = await axios.delete(`${url}/${id}`)
        return responsive.data
    }
    catch (error) {
        console.log(error)
    }
}
const getTodoList = async () => {
    try {
        const nowDate = new Date()
        const responsive = await axios.get(url)
        const result = responsive.data
        const data = result.map((todo: IToDo) => {
            const isExpired = todo.expiredDate && new Date(todo.expiredDate).getTime() < nowDate.getTime();
            const newType = isExpired ? "expired" : todo.status;
            return { ...todo, type: newType };
        })
        getTodo(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
export {
    getTodoList,
    createTodoList,
    eidtTodoList,
    deleteTodoList
}