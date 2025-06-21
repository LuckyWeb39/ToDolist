import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {CreateItemForm} from "@/common/components/createItemForm/CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/features/todolists/ui/Todolists.tsx";
import {createTodolistAC} from "@/features/todolists/model/TodolistReducer.ts";

export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }


    return (
        <>
            <Grid container>
                <Grid size='auto'>
                    <Paper sx={{p: '13px', marginBottom: '10px'}}>
                        <Typography sx={{m: '5px', opacity: '0.5'}}>Create new Todolist</Typography>
                        <CreateItemForm createItem={createTodolist}/>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Todolists/>
            </Grid>
        </>
    )
}