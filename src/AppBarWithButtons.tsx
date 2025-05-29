import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from "./Todolist.styled.ts";
import {Switch} from "@mui/material";

type Props ={
    ChangeThemeMode: ()=>void,
}

export const AppBarWithButtons = ({ChangeThemeMode}: Props) => {
    return (
        <Box sx={{flexGrow: 1, paddingBottom: '80px'}}>
            <AppBar position="fixed">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Log In</NavButton>
                        <NavButton>Log Out</NavButton>
                        <Switch onChange={ChangeThemeMode}/>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}