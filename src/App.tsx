import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

type TasksType = {
    [id: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'completed'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistID2]: [
          {id: v1(), title: 'HTML&CSS', isDone: true},
          {id: v1(), title: 'JS', isDone: true},
          {id: v1(), title: 'ReactJS', isDone: false}
        ],
    })

    const deleteTask = (todolistID:string,taskId: string) => {
        setTasks({...tasks,[todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
        // const filteredTasks = tasks.filter(task => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }

    const changeFilter = (todolistID:string,filter: FilterValues) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter}: t))
    }

    const deleteTodolist = (todolistID:string) => {
      setTodolists(todolists.filter(t => t.id !== todolistID))
      delete tasks[todolistID]
    }

    const createTask = (todolistID:string,title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks,[todolistID]:[newTask, ...tasks[todolistID]]})
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }

    const changeTaskStatus = (todolistID:string, taskId: string, isDone: boolean) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(t => t.id === taskId ? {...t, isDone}: t)})

        // const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        // setTasks(newState)
    }

    return (
        <div className="app">
          {todolists.map(t => {

            let filteredTasks = tasks[t.id]
            if (t.filter === 'active') {
              filteredTasks = filteredTasks.filter(task => !task.isDone)
            }
            if (t.filter === 'completed') {
              filteredTasks = filteredTasks.filter(task => task.isDone)
            }

            return (
                <TodolistItem key={t.id}
                              todolistID = {t.id}
                              title={t.title}
                              tasks={filteredTasks}
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}
                              createTask={createTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={t.filter}
                              deleteTodolist = {deleteTodolist}
                />
            )
          })}
        </div>
    )
}
