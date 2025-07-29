import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {changeTodolistFilterAC, Todolist} from "@/features/todolists/model/TodolistReducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: Todolist
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist
    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Box sx={{display: 'flex', justifyContent:'space-around'}}>
            <Button variant={filter === 'all' ? 'contained' : 'text'}
                // className={filter === 'all' ? 'active-filter' : ''}
                // title={'All'}
                    onClick={() => changeFilterHandler('all')}>All</Button>
            <Button variant={filter === 'active' ? 'contained' : 'text'}
                // className={filter === 'active' ? 'active-filter' : ''}
                // title={'Active'}
                    onClick={() => changeFilterHandler('active')}>Active</Button>
            <Button variant={filter === 'completed' ? 'contained' : 'text'}
                // className={filter === 'completed' ? 'active-filter' : ''}
                // title={'Completed'}
                    onClick={() => changeFilterHandler('completed')}>Completed</Button>
        </Box>
    )
}