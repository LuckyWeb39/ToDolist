import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/editableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/features/todolists/model/TasksReducer.ts";
import type {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import styles from "./TaskItem.module.css";

type Props = {
    task: Task
    id: string
}

export const TaskItem = ({task, id}:Props) => {
    const dispatch = useAppDispatch()

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({id, taskID:task.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({id, taskID:task.id, isDone:newStatusValue}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({id, taskID:task.id, title}))
    }

    return (
        <ListItem sx={{justifyContent: 'space-between'}}
                  className={task.isDone ? styles.isDone : ''}>

            {/*<input type="checkbox" checked={task.isDone}*/}
            {/*       onChange={changeTaskStatusHandler}/>*/}
            {/*<span>{task.title}</span>*/}
            <div>
                <Checkbox

                    checked={task.isDone}
                    disableRipple
                    onChange={changeTaskStatusHandler}
                />
                <EditableSpan title={task.title} onChangeTitle={changeTaskTitleHandler}/>
            </div>

            <IconButton size={'small'} onClick={deleteTaskHandler}><DeleteIcon/></IconButton>


        </ListItem>
    )
}