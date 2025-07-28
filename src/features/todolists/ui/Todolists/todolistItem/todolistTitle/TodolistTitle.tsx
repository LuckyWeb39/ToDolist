import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan"
import {DomainTodolists,} from "@/features/todolists/model/todolists-slice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {
    todolistsApi,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} from "@/features/todolists/api/todolistsApi.ts";
import {RequestStatus} from "@/common/types";
import {useAppDispatch} from "@/common/hooks";

type Props = {
    todolist: DomainTodolists
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist
    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
    const dispatch = useAppDispatch()

    const changeTodolistStatus = (entityStatus: RequestStatus) => {
        dispatch(
            todolistsApi.util.updateQueryData(
                'getTodolists',
                undefined,
                (state) => {
                   const todolist = state.find(todolist => todolist.id === id)
                    if (todolist) {
                        todolist.entityStatus = entityStatus
                    }
                }
            )
        )
    }

    const deleteTodolistHandler = () => {
        changeTodolistStatus('loading')
        removeTodolist(id)
            .unwrap()
            .catch(() => {
                changeTodolistStatus('idle')
            })
    }

    const changeTodolistTitleHandler = (title: string) => {
        updateTodolistTitle({todolistId: id, title})
    }

    const disabled = todolist.entityStatus === "loading"

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={disabled}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
