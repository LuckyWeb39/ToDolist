import {useAppDispatch} from "@/common/hooks"
import {containerSx} from "@/common/styles"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {DomainTodolists, FilterValues} from "@/features/todolists/lib/types";

type Props = {
  todolist: DomainTodolists
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(
        todolistsApi.util.updateQueryData(
            'getTodolists',
            undefined,
            (state)=>{
                const todolist = state.find(todolist => todolist.id === id)
                if(todolist) {
                    todolist.filter = filter
                }
            }
        )
    )
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
