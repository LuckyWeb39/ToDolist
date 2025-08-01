import {TodolistItem} from "./TodolistItem/TodolistItem"
import Paper from "@mui/material/Paper"
import {Grid} from "@mui/material";
import {useGetTodolistsQuery} from "@/features/todolists/api/todolistsApi.ts";
import {containerSx} from "@/common/styles";
import Box from "@mui/material/Box";
import {TodolistSkeleton} from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx";




export const Todolists = () => {

   const {data: todolists, isLoading} = useGetTodolistsQuery()
    if(isLoading) {
        return (
            <Box sx={containerSx} style ={{gap: "32px"}}>
                {Array(3)
                .fill(null)
                .map((_, id) => (
                    <TodolistSkeleton key = {id}/>
                ))}
            </Box>
        )
    }

    return (
        <>
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
