import { useState, useEffect } from 'react';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
const Todos = () => {
    //Estados para almacenar lista de tareas
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [showX, setShowX] = useState(false);
    //Notificaciones de eventos
    //const notifyTaskAdded = () => toast.success('Tarea Agregada');
    //const notifyTaskEmpty = () => toast.warn('Agrega Una Tarea');
    //const notifyTaskDeleted = () => toast.error('Tarea Eliminada');
    /*const handlePressKey = (e) => {
        if (newTask === '' && e.key === 'Enter') {
            notifyTaskEmpty()
            return
        }
        if (e.key === 'Enter') {
            setTaskList([...taskList, newTask])
            notifyTaskAdded('Task Add')
            setNewTask('')
        }
    }*/
    
    //API fetch
    const createUser = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/any', {
                method: 'POST',
            });
            if (!response.ok) {
                console.log("User already exist");
            }
            const data = await response.json();
            console.log('User created:', data);
        } catch (error) {
            console.error('Error creating tasks:', error);
        }
    };
    const createTasks = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/any', {
                method: 'GET',
            });
            if (!response.ok) {
                console.log("Error bringing tasks");
            }
            const data = await response.json();
            setTaskList(data.todos);
        } catch (error) {
            console.error('Error bringing tasks:', error);
        }
    };
    const deleteUser = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/any', {
                method: 'DELETE',
            });
            if (response.ok) {
                setTaskList([]);
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setTaskList(taskList.filter(task => task.id !== id));
            } else {
                console.error('Error deleting todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const createTodo = async (e) => {
        if (newTask === '' && e.key === 'Enter') {
            //notifyTaskEmpty();
            return;
        }
        if (e.key === 'Enter') {
            try {
                const response = await fetch('https://playground.4geeks.com/todo/todos/any', {
                    method: 'POST',
                    body: JSON.stringify({
                        "label": newTask,
                        "is_done": false
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    console.log("Error creating tasks");
                }
                const data = await response.json();
                console.log('Tasks created:', data);
                setTaskList([...taskList, data]); 
                setNewTask('');
            } catch (error) {
                console.error('Error creating tasks:', error);
            }
        }
    };
    useEffect(() => {
        createTasks();
    }, []);
    return (
        <>
            <h1>Lista De Tareas</h1>
            <div className='buttons'>
                <button onClick={createUser}>Crear Nuevo Usuario</button>
                <button onClick={deleteUser}>Eliminar Usuario</button>
            </div>
            <ul>
                <li>
                    <input 
                        name="task" 
                        placeholder={taskList && taskList.length === 0 ? 'No unfinished tasks, add a new one' : 'Add tasks'}
                        onChange={(e) => { setNewTask(e.target.value) }} 
                        value={newTask} 
                        onKeyDown={createTodo} 
                    />
                </li>
                {taskList && taskList.map((task, index) => (
                    <li className='Task'
                        key={index}
                        onMouseEnter={() => setShowX(true)}
                        onMouseLeave={() => setShowX(false)} >
                        {task.label}
                        {showX ? <i className='fa-solid fa-trash' onClick={() => deleteTodo(task.id)}></i> : null}
                    </li>
                ))}
                <li><strong>{taskList && taskList.length}</strong> Tareas Faltantes</li>
            </ul>
        </>
    );
};
export default Todos;