import './App.css'
import {useReducer, useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {ButtonAppBar} from "./AppHeader.tsx";
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {Container, CssBaseline, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    changeFilterAC,
    ChangeTitleAC,
    createTodolistAC,
    DeleteTodolistAC,
    todolistsReducer
} from "./module/TodolistReducer.ts";
import {
    changeTaskStatusAC, changeTaskTitleAC,
    createTaskAC, createTasksForNewTodolistAC,
    deleteTaskAC, deleteTodolistTasksAC,
    TasksReducer
} from "./module/TasksReducer.ts";


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
    const todolistId1 = v1()
    const todolistId2 = v1()
    const todolistId3 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
        {id: todolistId3, title: 'What to play', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(TasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Meet', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
        ],
        [todolistId3]: [
            {id: v1(), title: 'Dota', isDone: false},
            {id: v1(), title: 'CS', isDone: false},
            {id: v1(), title: 'Dendi', isDone: true},
        ],
    })

    const [themeMode, setThemeMode] = useState<ThemeValue>('light')


    const changeFilter = (todolistId: string, filter: FilterValues) => {
       dispatchTodolists(changeFilterAC(todolistId,filter))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatchTodolists(DeleteTodolistAC(todolistId))
        dispatchTasks(deleteTodolistTasksAC(todolistId))
        console.log(tasks)
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        dispatchTodolists(createTodolistAC(title, todolistId))
        dispatchTasks(createTasksForNewTodolistAC(todolistId))
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
       dispatchTodolists(ChangeTitleAC(todolistID,title))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTaskAC(todolistId,taskId))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatchTasks(createTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId,taskId,isDone))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todolistID,taskID,title))
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
