import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {TaskStatus} from "@/common/enums";
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi.ts";
import {TaskSkeleton} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskSkeleton/TaskSkeleton.tsx";
import {DomainTodolists} from "@/features/todolists/lib/types";
import {useState} from "react";
import {
    TasksPagination
} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx";
import {PAGE_SIZE} from "@/common/constants";

type Props = {
    todolist: DomainTodolists
}


export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist
    const [page, setPage] = useState(1)

    const {data, isLoading} = useGetTasksQuery({
        todolistId: id,
        params: {page}
    })

    if (isLoading) {
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
                <>
                    <List>
                        {filteredTasks?.map(task => <TaskItem key={task.id} task={task} todolist={todolist}/>)}
                    </List>
                    {data &&
                        data?.totalCount > PAGE_SIZE &&
                        <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage}/>}

                </>
            )}
        </>
    )
}
