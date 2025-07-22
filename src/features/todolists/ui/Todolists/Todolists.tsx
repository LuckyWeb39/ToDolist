import {TodolistItem} from "./TodolistItem/TodolistItem"
import Paper from "@mui/material/Paper"
import {Grid} from "@mui/material";
import {useGetTodolistsQuery} from "@/features/todolists/api/todolistsApi.ts";


export const Todolists = () => {
    // const [skip, setSkip] = useState(true)
    // const {data: todolists} = useGetTodolistsQuery(undefined, {skip})
    //
    // const fetchTodolists = () => {
    //   setSkip(false)
    // }
    // Вариант Conditional Fetch(запроса от условия) с использованием встроенного параметра "skip"
    //


    // const [trigger, {data: todolists}] = useLazyGetTodolistsQuery();
    //
    // const fetchTodolistsHandler = () => {
    //     trigger()
    // }
    // Вариант Conditional Fetch(запроса от условия)
    // с использованием вызова запроса по вызову "функции триггера"
   const {data: todolists} = useGetTodolistsQuery()

    return (
        <>
            {/*<div>*/}
            {/*    <button onClick={fetchTodolistsHandler}>Download todolists</button>*/}
            {/*</div>*/}
            {todolists?.map((todolist) => (
                <Grid key={todolist.id}>
                    <Paper sx={{p: "0 20px 20px 20px"}}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                </Grid>
            ))}
        </>
    )
}
