import axios from "axios"
const url: string = "https://6697641b02f3150fb66d6dcf.mockapi.io/api/todo_list/todo_list"
const getTodoList = async () => {
    try {
        const responsive = await axios.get(url)
        return responsive.data
    } catch (error) {
        console.log(error)
    }
}
const createTodoList = async (todo: string) => {
    try {
        const responsive = await axios.post(url, {
            todo: todo
        })
        return responsive.data
    } catch (error) {
        console.log(error)
    }
}
const eidtTodoList = async (todo: string, id: string) => {
    try {
        const responsive = await axios.put(`${url}/${id}`, {
            todo: todo
        })
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
export {
    getTodoList,
    createTodoList,
    eidtTodoList,
    deleteTodoList
}