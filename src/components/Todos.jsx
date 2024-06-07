import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Todos = () => {

    const [newTask, setNewTask] = useState ("");
    const [taskList, setTaskList] = useState ([])

    const notifyTaskAdded = () => toast.success('Tarea Agregada');
    const notifyTaskEmpty = () => toast.success('Agrega Una Tarea');
    const notifyTaskDeleted = () => toast.error('Tarea Eliminada');

    const handlePressKey = (e) => {
        if (newTask ==='' && e.key === 'Enter') {
            notifyTaskEmpty()
            return 
        }
        if(e.key === 'Enter'){
            setTaskList([... taskList, newTask])
            notifyTaskAdded('Task Add')
            setNewTask('')
        }
    }
    const handleDeleteTask = (index) => {
        setTaskList(taskList.filter((task, i) => i !== index))
        notifyTaskDeleted()
    }
 
    return (
    <>
        <h1>Lista De Tareas</h1>
        <ul>
            <li><input type="text" placeholder="Añadir Tarea" onChange={(e) => { setNewTask(e.target.value)}} value={newTask} onKeyDown={handlePressKey}/></li>
            {taskList.map ((task, index) => {
                return <li key={index}>{task} <i className='fas fa-xmark' onClick={() => handleDeleteTask(index)}></i></li>
            })}
            <li className='ultimo-item'></li>
            <li><strong>{taskList.length}</strong> Tareas Faltantes</li>
        </ul>
        <ToastContainer/>
    </>
    );
};

export default Todos;