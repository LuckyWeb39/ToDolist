import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm"

import {Todolists} from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import {Grid} from "@mui/material";
import {useAddTodolistMutation} from "@/features/todolists/api/todolistsApi.ts";


export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
