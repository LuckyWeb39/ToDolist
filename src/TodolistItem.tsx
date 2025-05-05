import {type ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import DeleteIcon from '@mui/icons-material/Delete';
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id: todolistID, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle,
    } = props


    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolistID, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistID)
    }

    const createTaskHandler = (title: string) => {
        createTask(todolistID, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistID, title)
    }


    return (
        <div>
            <div className={'container'}>
                {/*<h3>{title}</h3>*/}
                <h3>
                    <EditableSpan title={title} onChangeTitle={changeTodolistTitleHandler}/>
                    <IconButton aria-label={'Delete todolist'}
                                onClick={deleteTodolistHandler}
                                size={'small'}
                                color={'error'}>
                        <DeleteIcon/>
                    </IconButton>
                </h3>
            </div>
            <CreateItemForm createItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(todolistID, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(todolistID, task.id, newStatusValue)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolistID, task.id, title)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan title={task.title} onChangeTitle={changeTaskTitleHandler}/>
                                <IconButton size={'small'} onClick={deleteTaskHandler}><DeleteIcon /></IconButton>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button variant={filter === 'all' ? 'contained' : 'text'}
                        // className={filter === 'all' ? 'active-filter' : ''}
                        // title={'All'}
                        onClick={() => changeFilterHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'text'}
                        // className={filter === 'active' ? 'active-filter' : ''}
                        // title={'Active'}
                        onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'text'}
                        // className={filter === 'completed' ? 'active-filter' : ''}
                        // title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}>Completed</Button>
            </div>
        </div>
    )
}
