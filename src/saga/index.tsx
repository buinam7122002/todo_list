import { all, call, takeEvery } from 'redux-saga/effects';
import { addTodo, deleteTodo, editTodo, getTodo } from '../reducers';

function* addTodoListSaga(action: { type: string, payload: string }) {
    yield call(addTodo, action.payload);
}
function* deleteTodoListSage(action: { type: string, payload: string }) {
    yield call(deleteTodo, action.payload);
}
function* editTodoListSaga(action: { type: string, payload: { update: string, id: string } }) {
    yield call(editTodo, action.payload.update, action.payload.id)
}
function* getTodoListSaga(action: { type: string, payload: string }) {
    yield call(getTodo, action.payload);
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
function* getTodoList() {
    yield takeEvery('GET_TODO', getTodoListSaga);
}
export default function* rootSaga() {
    yield all([
        call(addTodoList),
        call(deleteTodoList),
        call(editTodoList),
        call(getTodoList)
    ]);
}