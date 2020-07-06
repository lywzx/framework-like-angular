/*
 * action types
 */
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const CHANGE_TODO = 'CHANGE_TODO';
export const CLEAR_COMPLETED_TODO = 'CLEAR_COMPLETED_TODO';
export const TOGGLE_TODO_LIST_COMPLETE_STATE = 'TOGGLE_TODO_LIST_COMPLETE_STATE';

/*
 * action creators
 */
export function addTodo(text: string) {
  return { type: ADD_TODO, text };
}

export function toggleTodo(id: number) {
  return { type: TOGGLE_TODO, id };
}

export function deleteTodo(id: number) {
  return {
    type: DELETE_TODO,
    id,
  };
}

export function changeTodo(id: number, text: string) {
  return {
    type: CHANGE_TODO,
    id,
    text,
  };
}

export function clearCompletedTodo() {
  return {
    type: CLEAR_COMPLETED_TODO,
  };
}

export function toggleTodoListCompleteState(completed: boolean) {
  return {
    type: TOGGLE_TODO_LIST_COMPLETE_STATE,
    completed,
  };
}
