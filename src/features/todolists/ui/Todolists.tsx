import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectorTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/features/todolists/ui/Todolists/todolistItem/TodolistItem.tsx";

export const Todolists = () => {

    const todolists = useAppSelector(selectorTodolists)

    return(
        <>
            {todolists?.map(todolist => {
            return <Grid key={todolist.id}>
                    <Paper elevation={4} style={{maxWidth: '300px', padding: '10px'}}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                </Grid>

        })}
        </>


    )
}