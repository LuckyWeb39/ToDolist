import {Button} from "./Button.tsx";

export type TaskType = {
    id: number
    title: string
    isComplete: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
}

export const ToDoList = ({title, tasks, date}:TodoListPropsType) =>{
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
                            </li>
                        )

                    })}
                </ul>)}

            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </div>
            <div>{date}</div>
        </div>
    )
}