import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isComplete: boolean
}

export type FilterValues = 'All' | 'Completed' | 'Active';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
}

export const ToDoList = ({title, tasks, date}: TodoListPropsType) => {

    let [FilteredTasks, setFilteredTasks] = useState(tasks)

    let [filter, setFilter] = useState<FilterValues>('All');

    const StatusFiltered = (status: FilterValues) => {
        setFilter(status);
    }

    if (filter === 'Active') {
        FilteredTasks = tasks.filter(task => !task.isComplete)
    }
    if (filter === 'Completed') {
        FilteredTasks = tasks.filter(task => task.isComplete)
    }

    const deleteTask = (id: string) => {
        const deletedTasks = FilteredTasks.filter(task => task.id !== id)
        setFilteredTasks(deletedTasks);
    }
    const threeTasks = () => {
        setFilteredTasks(tasks.slice(0, 3))
    }

    const deletedAllTasks = () => {
        setFilteredTasks([])
    }

    let [inputValue, setInputValue] = useState('')

    const AddNewTask = () => {
        let newTask = {id: v1(), title: inputValue, isComplete: false}
        setFilteredTasks([newTask, ...FilteredTasks])
        setInputValue('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        debugger
        if (e.key === "Enter") {
            setInputValue(e.currentTarget.value)
            AddNewTask()
        }
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={inputValue} onChange={onChangeHandler} onKeyUp={onKeyUpHandler}/>
                <Button title={"+"} onClick={AddNewTask}/>
            </div>
            {FilteredTasks.length === 0 ? (
                <p>No tasks</p>
            ) : (<ul>
                {FilteredTasks.map(task => {

                    const onClickHandler = () => deleteTask(task.id)

                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isComplete}/>
                            <span>{task.title}</span>
                            <Button title={"X"} onClick={onClickHandler}/>
                        </li>
                    )

                })}
            </ul>)}

            <div>
                <Button title={"All"} onClick={() => StatusFiltered('All')}/>
                <Button title={"Active"} onClick={() => StatusFiltered('Active')}/>
                <Button title={"Completed"} onClick={() => StatusFiltered('Completed')}/>
                <Button title={'First 3-th tasks'} onClick={() => threeTasks()}/>
                <Button title={'Delete all'} onClick={() => deletedAllTasks()}/>
            </div>
            <div>{date}</div>
        </div>
    )
}