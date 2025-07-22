import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan"
import {DomainTodolists,} from "@/features/todolists/model/todolists-slice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {useRemoveTodolistMutation, useUpdateTodolistTitleMutation} from "@/features/todolists/api/todolistsApi.ts";

type Props = {
  todolist: DomainTodolists
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolistHandler = () => {
   removeTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
      updateTodolistTitle({todolistId: id, title})
  }

  const disabled = todolist.entityStatus === "loading"

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={disabled} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
