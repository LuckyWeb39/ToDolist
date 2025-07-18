import {changeThemeModeAC, selectStatus, selectThemeMode} from "@/app/app-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import {LinearProgress} from "@mui/material";
import {logoutTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice.ts";
import {Navigate} from "react-router";
import {Path} from "@/common/routing";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const selectAppStatus = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login}/>
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {selectAppStatus === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
