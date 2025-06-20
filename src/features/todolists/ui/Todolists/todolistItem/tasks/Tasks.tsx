import { useAppSelector } from "@/common/hooks"

import {DomainTodolists} from "@/features/todolists/model/todolists-slice.ts"
import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {selectTasks} from "@/features/todolists/model/tasks-slice.ts";

type Props = {
  todolist: DomainTodolists
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => !task.isDone)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.isDone)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={id} />
          ))}
        </List>
      )}
    </>
  )
}
