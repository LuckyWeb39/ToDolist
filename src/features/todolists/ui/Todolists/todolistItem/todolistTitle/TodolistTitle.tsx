import {EditableSpan} from "@/common/components/editableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/features/todolists/model/TodolistReducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import styles from './TodolistTitle.module.css'

type props= {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}:props) => {
    const {id,title} = todolist
    const dispatch = useAppDispatch()

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }

    return (
        <div className={styles.container}>
            {/*<h3>{title}</h3>*/}
            <h2 className={styles.todolistTitle}>
                <EditableSpan title={title} onChangeTitle={changeTodolistTitleHandler}/>
                <IconButton aria-label={'Delete todolist'}
                            onClick={deleteTodolistHandler}
                            size={'small'}
                            color={'error'}>
                    <DeleteIcon/>
                </IconButton>
            </h2>
        </div>
    )
}