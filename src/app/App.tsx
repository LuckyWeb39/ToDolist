import {Header} from "@/common/components/Header/Header"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {getTheme} from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import {selectThemeMode, setIsLoggedInAC} from "@/app/app-slice.ts";
import {ErrorSnackbar} from "@/common/components";
import {Routing} from "@/common/routing";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import styles from "./App.module.css";
import {useMeQuery} from "@/features/auth/api/authApi.ts";
import {ResultCode} from "@/common/enums";

//
// export const App = () => {
//     const themeMode = useAppSelector(selectThemeMode)
//     const dispatch = useAppDispatch();
//     const theme = getTheme(themeMode)
//     const [isInitialized, setIsInitialized] = useState(false)
//
//     const {data, isLoading} = useMeQuery()
//
//     useEffect(() => {
//         if (isLoading) return
//         setIsInitialized(true)
//         console.log(data)
//         if (data?.resultCode === ResultCode.Success) {
//             dispatch(setIsLoggedInAC({isLoggedIn: true}));
//         }
//     }, [isLoading]);
//
//
//     if (!isInitialized) {
//         return (
//             <div className={styles.circularProgressContainer}>
//                 <CircularProgress size={150} thickness={3} />
//             </div>
//         )
//     }
//
//     return (
//         <ThemeProvider theme={theme}>
//             <div className={styles.app}>
//                 <CssBaseline/>
//                 <Header/>
//                 <Routing/>
//                 <ErrorSnackbar/>
//             </div>
//         </ThemeProvider>
//     )
// }


export const App = () => {
    const [isInitialized, setIsInitialized] = useState(false)

    const themeMode = useAppSelector(selectThemeMode)

    const { data, isLoading } = useMeQuery()

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    useEffect(() => {
        if (isLoading) return
        setIsInitialized(true)
        if (data?.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedInAC({ isLoggedIn: true }))
        }
    }, [isLoading])

    if (!isInitialized) {
        return (
            <div className={styles.circularProgressContainer}>
                <CircularProgress size={150} thickness={3} />
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.app}>
                <CssBaseline />
                <Header />
                <Routing />
                <ErrorSnackbar />
            </div>
        </ThemeProvider>
    )
}
