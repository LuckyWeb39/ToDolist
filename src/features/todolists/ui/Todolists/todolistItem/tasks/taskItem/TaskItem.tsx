import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type {ChangeEvent} from "react"
import {getListItemSx} from "./TaskItem.styles"
import {TaskStatus} from "@/common/enums";
import {DomainTask, UpdateTaskModel} from "@/features/todolists/api/tasksApi.types.ts";

import {useDeleteTaskMutation, useUpdateTaskMutation} from "@/features/todolists/api/tasksApi.ts";
import {DomainTodolists} from "@/features/todolists/lib/types";

type Props = {
  task: DomainTask
  todolist: DomainTodolists
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const deleteTaskHandler = () => {
    deleteTask({ todolistId: todolist.id, taskId: task.id })
  }

  const buildModel =(overrides: Partial<UpdateTaskModel>): UpdateTaskModel => ({
    status:task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...overrides
  })

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed: TaskStatus.New
    updateTask({ todolistId: todolist.id, taskId: task.id, model: buildModel({status}) })
  }

  const changeTaskTitle = (title: string) => {
    updateTask({ todolistId: todolist.id, taskId: task.id, model: buildModel({title})})
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled}/>
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
        <span style={{fontSize:'10px', marginLeft:'10px', opacity:'0.4'}}>{new Date(task.addedDate).toLocaleDateString()}</span>
      </div>
      <IconButton onClick={deleteTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
