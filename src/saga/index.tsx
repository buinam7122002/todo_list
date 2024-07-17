import { all, call, takeEvery } from 'redux-saga/effects';
import { addTodo, deleteTodo, editTodo } from '../reducers';

function* addTodoListSaga(action: { type: string, payload: string }) {
    yield call(addTodo, action.payload);
}
function* deleteTodoListSage(action: { type: string, payload: string }) {
    yield call(deleteTodo, action.payload);
}
function* editTodoListSaga(action: { type: string, payload: { todo: string, todoIndex: number } }) {
    yield call(editTodo, action.payload.todo, action.payload.todoIndex)
}

function* addTodoList() {
    yield takeEvery('ADD_TODO', addTodoListSaga);
}
function* deleteTodoList() {
    yield takeEvery('DELETE_TODO', deleteTodoListSage);
}
function* editTodoList() {
    yield takeEvery('EDIT_TODO', editTodoListSaga);
}
export default function* rootSaga() {
    yield all([
        call(addTodoList),
        call(deleteTodoList),
        call(editTodoList)
    ]);
}
