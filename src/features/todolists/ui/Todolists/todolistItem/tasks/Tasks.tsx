
import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {TaskStatus} from "@/common/enums";
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi.ts";
import {TaskSkeleton} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskSkeleton/TaskSkeleton.tsx";
import {DomainTodolists} from "@/features/todolists/lib/types";

type Props = {
  todolist: DomainTodolists
}


export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const {data, isLoading} = useGetTasksQuery(id)

  if(isLoading) {
    return <TaskSkeleton/>
  }

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolist={todolist} />
          ))}
        </List>
      )}
    </>
  )
}
