import {Button} from "./Button.tsx";
import {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isComplete: boolean
}

export type FilterValues = 'All' | 'Completed' | 'Active';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
}

export const ToDoList = ({title, tasks, date}:TodoListPropsType) =>{

    let [FilteredTasks, setFilteredTasks] = useState(tasks)

    let [filter, setFilter] = useState<FilterValues>('All');

    const StatusFiltered = (status: FilterValues) => {
        setFilter(status);
    }

    if (filter === 'Active') {FilteredTasks = tasks.filter(task => !task.isComplete)}
    if (filter === 'Completed') {FilteredTasks = tasks.filter(task => task.isComplete)}

    const deleteTask = (id: number) => {
        const deletedTasks = FilteredTasks.filter(task => task.id !== id)
        setFilteredTasks(deletedTasks);
    }
    const threeTasks = () => {
        setFilteredTasks(tasks.slice(0,3))
    }

    const deletedAllTasks = () => {
        setFilteredTasks([])
    }



    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {FilteredTasks.length === 0 ? (
                <p>No tasks</p>
            ): (<ul>
                {FilteredTasks.map (task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isComplete}/>
                                <span>{task.title}</span>
                                <Button title={"X"} onClick={()=>deleteTask(task.id)}/>
                            </li>
                        )

                    })}
                </ul>)}

            <div>
                <Button title={"All"} onClick={()=>StatusFiltered('All')}/>
                <Button title={"Active"} onClick={()=>StatusFiltered('Active')}/>
                <Button title={"Completed"} onClick={()=>StatusFiltered('Completed')}/>
                <Button title={'First 3-th tasks'} onClick={()=>threeTasks()}/>
                <Button title={'Delete all'} onClick={()=>deletedAllTasks()}/>
            </div>
            <div>{date}</div>
        </div>
    )
}