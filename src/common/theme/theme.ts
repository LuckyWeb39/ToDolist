import {createTheme} from "@mui/material/styles";
import {ThemeValue} from "@/features/todolists/model/appReducer.ts";

export const getTheme = (themeMode: ThemeValue) => {

    return(
        createTheme({
            palette: {
                mode: themeMode,
                primary: {
                    main: '#008394',
                },
                secondary: {
                    main: '#ea80fc',
                },

            },
        })
    )
}