import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {v1} from "uuid";
import {useAutoAnimate} from "@formkit/auto-animate/react";

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
    const [listRef] = useAutoAnimate<HTMLUListElement>()

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
        if (e.key === "Enter" && inputValue.length < 10 && inputValue) {
            setInputValue(e.currentTarget.value)
            AddNewTask()
        }
    }

    const isAddBtnConditions = !inputValue || inputValue.length > 10


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input  placeholder={'Add title task'} value={inputValue} onChange={onChangeHandler} onKeyUp={onKeyUpHandler}/>
                <Button title={"+"} onClick={AddNewTask} disabled={isAddBtnConditions}/>

                {inputValue && <div style={{color:'red', fontSize: '10px'}}>Task title length should be 10 symbols max</div>}
            </div>
            {FilteredTasks.length === 0 ? (
                <p>No tasks</p>
            ) : (<ul ref={listRef}>
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