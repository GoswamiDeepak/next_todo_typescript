"use client"
import { createContext, useState, useContext } from "react";

type Todo = {
    id:string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

type TodosContext = {
    todos:Todo[];
    handleAddTodo:(task:string) => void;
    toggleTodoAsCompleted:(id:string) => void;
    handleDeleteTodo:(id:string) => void;
}

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: {children : React.ReactNode}) => {

    const [todos, setTodos] = useState<Todo[]>(()=>{
       try {
        const newTodos = localStorage.getItem('todos') || "[]";
        return JSON.parse(newTodos) as Todo[]
       } catch (error) {
        return [];
       }
    })


    const handleAddTodo = (task:string)=>{
      setTodos((prev)=>{
        const newTodos:Todo[] = [
            {
                id:Math.random().toString(),
                task: task,
                completed:false,
                createdAt : new Date()
            },
            ...prev
        ]
        localStorage.setItem('todos', JSON.stringify(newTodos));
        return newTodos;
      })
    }

    const toggleTodoAsCompleted = (id:string) => {
        setTodos((prev)=>{
            const newTodos = prev.map((todo)=>{
                if(todo.id === id){
                    return {...todo, completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem('todos', JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const handleDeleteTodo = (id:string)=>{
        setTodos((prev)=>{
            const newTodos = prev.filter((todo)=>todo.id !== id)
            localStorage.setItem('todos', JSON.stringify(newTodos));
            return newTodos
        })
    }

    return (
        <todosContext.Provider value={{todos,handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo}}>
            {children}
        </todosContext.Provider>
    )
}

export const useTodos = ()=>{
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error('new provider available')
    }
    return todosConsumer;
}