import React from "react";
import "./App.css";

const App = () => {

    const storagedTodos = JSON.parse(localStorage.getItem("todos"));

    let initialState = []

    if(storagedTodos != null && storagedTodos !== ""){
        initialState = storagedTodos;
    }

    const [todos, setTodos] = React.useState(initialState);
    const [todo, setTodo] = React.useState("");

    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    React.useEffect(() => {
        const loadedTodos = JSON.parse(localStorage.getItem("todos"));
        if(loadedTodos){
            setTodos(loadedTodos)
        }
    }, []);

    React.useEffect(() => {
        const todosToStore = JSON.stringify(todos);
        localStorage.setItem("todos", todosToStore);
    }, [todos])

    function handleSubmit(e){

        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,
        };

        if(newTodo.text.length > 0){
            setTodos([...todos].concat(newTodo));
            setTodo("");

        }else{

            alert("Enter Valid Task")
            setTodo("");
        }
    }

    function deleteTodo(id){
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    function toggleComplete(id){
        let updatedTodos = [...todos].map((todo) => {
            if(todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function submitEdits(id){
        const updatedTodos = [...todos].map((todo) => {
            if(todo.id === id){
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    return(

        <div id="todo-list">

            <h1>Todo List</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type ="text" onChange={(e) => setTodo(e.target.value)}
                    placeholder="Add a new task" value={todo}
                />

                <button type ="submit">Add Todo</button>
            </form>
            {todos.map((todo) => (
                <div className="todo" key={todo.id}>
                    <div className="todo-text">
                        <input type="checkbox" 
                        id="completed" 
                        checked={todo.completed} 
                        onChange={() => toggleComplete(todo.id)}
                        />
                        {todo.id === todoEditing ? (
                            <input 
                            type="text" 
                            onChange={(e) => setEditingText(e.target.value)}
                            />
                        ) : (
                            <div>{todo.text}</div>
                        )}
                    </div>

                    <div className="todo-actions">
                        {todo.id === todoEditing ? (
                            <button type="button" onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                        ) : (
                            <button type="button" onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}        

                        <button type ="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>      
                </div>
            ))}
        </div>
    );
};

export default App;