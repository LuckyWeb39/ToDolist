import './App.css'
import {useState} from 'react'
import {TodolistItem} from '../TodolistItem.tsx'
import {CreateItemForm} from "../CreateItemForm.tsx";
import {ButtonAppBar} from "../AppHeader.tsx";
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {Container, CssBaseline, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
} from "../model/TodolistReducer.ts";
import {
    changeTaskStatusAC, changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
} from "../model/TasksReducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectorTodolists} from "../model/todolists-selectors.ts";
import {selectorTasks} from "../model/tasks-selector.ts";


export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

type ThemeValue = 'light' | 'dark'


export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {


    const todolists = useAppSelector(selectorTodolists)
    const tasks = useAppSelector(selectorTasks)

    const dispatch = useAppDispatch()

    const [themeMode, setThemeMode] = useState<ThemeValue>('light')


    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id:todolistId}))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
    }

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

    const ChangeThemeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#008394',
            },
            secondary: {
                main: '#ea80fc',
            },

        },
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container fixed>

                    <ButtonAppBar ChangeThemeMode={ChangeThemeMode}/>

                    <Grid container>
                        <Grid size='auto'>
                            <Paper sx={{p:'13px', marginBottom:'10px'}}>
                                <Typography sx={{m: '5px', opacity:'0.5'}} >Create new Todolist</Typography>
                                <CreateItemForm createItem={createTodolist}/>
                            </Paper>
                        </Grid>
                    </Grid>


                    <Grid container spacing={3}>
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
                    </Grid>

                </Container>
            </ThemeProvider>


        </div>
    )
}
