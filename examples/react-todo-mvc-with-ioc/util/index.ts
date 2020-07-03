import {TodoInterface} from "../interfaces/todo.interface";

export function filterTodoByRouteName(todos: TodoInterface[], routeName: string) {
  if (routeName === '/active') {
    return todos.filter((it: TodoInterface) => !it.completed);
  } else if (routeName === '/completed') {
    return todos.filter((it: TodoInterface) => it.completed);
  }
  return todos;
}
