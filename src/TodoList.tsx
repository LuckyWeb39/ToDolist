import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";

export type TaskType = {
    id: number
    title: string
    isComplete: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    deleteTask: (id: number) => void
    deletedAllTasks: () => void
    StatusFiltered: (status:FilterValues) => void
    threeTasks: ()=> void
}

export const ToDoList = ({title, tasks, date,deleteTask,deletedAllTasks,StatusFiltered,threeTasks}:TodoListPropsType) =>{
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ): (<ul>
                {tasks.map (task => {
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