import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC, FilterValues
} from "@/model/TodolistReducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectorTodolists} from "@/model/todolists-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/TodolistItem.tsx";
import {selectorTasks} from "@/model/tasks-selector.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/TasksReducer.ts";

export const Todolists = () => {

    const dispatch = useAppDispatch()

    const todolists = useAppSelector(selectorTodolists)
    const tasks = useAppSelector(selectorTasks)


    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistID, taskID, title}))
    }



    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id:todolistId}))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
    }


    return(
        <>
            {todolists?.map(todolist => {
            const todolistTasks = tasks[todolist.id]
            let filteredTasks = todolistTasks
            if (todolist.filter === 'active') {
                filteredTasks = todolistTasks.filter(task => !task.isDone)
            }
            if (todolist.filter === 'completed') {
                filteredTasks = todolistTasks.filter(task => task.isDone)
            }

            return (
                <Grid>
                    <Paper elevation={4} style={{maxWidth: '300px', padding: '10px'}}>
                        <TodolistItem key={todolist.id}
                                      todolist={todolist}
                                      tasks={filteredTasks}
                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}
                                      deleteTodolist={deleteTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}
                        /></Paper>
                </Grid>
            )
        })}
        </>


    )
}