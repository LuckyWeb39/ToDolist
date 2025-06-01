import {CreateItemForm} from "@/common/components/createItemForm/CreateItemForm.tsx";
import {Todolist} from "@/features/todolists/model/TodolistReducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTaskAC} from "@/features/todolists/model/TasksReducer.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/todolistItem/todolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/todolistItem/tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/todolistItem/filterButtons/FilterButtons.tsx";

type Props = {
    todolist: Todolist
}
export const TodolistItem = ({todolist}: Props) => {

    const dispatch = useAppDispatch()
    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({id:todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm createItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>

        </div>
    )
}
