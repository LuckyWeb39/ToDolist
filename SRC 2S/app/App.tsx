import {ThemeProvider} from '@mui/material/styles'
import {Container, CssBaseline} from "@mui/material";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectorApp} from "@/features/todolists/model/appSelector.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "@/common/components/header/Header.tsx";
import {Main} from "@/app/Main.tsx";


export const App = () => {

    const themeMode = useAppSelector(selectorApp)

    const theme = getTheme(themeMode)

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container fixed>

                    <Header/>
                    <Main/>

                </Container>
            </ThemeProvider>
        </div>
    )
}
