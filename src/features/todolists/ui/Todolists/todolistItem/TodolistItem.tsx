import {FilterButtons} from "./FilterButtons/FilterButtons"
import {DomainTodolists} from "@/features/todolists/model/todolists-slice.ts"
import {Tasks} from "./Tasks/Tasks"
import {TodolistTitle} from "./TodolistTitle/TodolistTitle"
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"
import {useCreateTaskMutation} from "@/features/todolists/api/tasksApi.ts";

type Props = {
    todolist: DomainTodolists
}

export const TodolistItem = ({todolist}: Props) => {
    const [createTask] = useCreateTaskMutation()

    const createTaskHandler = (title: string) => {
        createTask({todolistId: todolist.id, title})
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
