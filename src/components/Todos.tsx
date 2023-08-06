"use client";
import { useTodos } from "@/store/store";
import { useSearchParams } from "next/navigation";
const Todos = () => {
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();
  const searchParams = useSearchParams();
  const todoData = searchParams.get("todos");

  let filterTodo = todos;

  if(todoData == "active") {
    filterTodo = filterTodo.filter((todo)=>!todo.completed)
  }

  if(todoData == "completed") {
    filterTodo = filterTodo.filter((todo)=>todo.completed)
  }
  return (
    <ul>
      {filterTodo.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              id={`id:${todo.id}`}
              onChange={() => toggleTodoAsCompleted(todo.id)}
              checked={todo.completed}
            />
            <label htmlFor={`id:${todo.id}`}>{todo.task}</label>
            {todo.completed && <button type="button" onClick={()=>handleDeleteTodo(todo.id)}>Delete</button>}
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
