import List from "@mui/material/List";
import {Todolist} from "@/features/todolists/model/TodolistReducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectorTasks} from "@/features/todolists/model/tasks-selector.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/todolistItem/tasks/taskItem/TaskItem.tsx";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectorTasks)


    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List sx={{width: '100%'}}>
                    {filteredTasks.map(task => {

                        return (
                        <TaskItem key={task.id} task={task} id={todolist.id}/>
                        )
                    })}
                </List>
            )}
        </>
    )
}