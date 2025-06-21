import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectorApp} from "@/features/todolists/model/appSelector.ts";
import {changeThemeModeAC} from "@/features/todolists/model/appReducer.ts";
import {AppBarWithButtons} from "@/common/components/appBarWithButtons/AppBarWithButtons.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

export const Header = () => {
    const themeMode = useAppSelector(selectorApp)
    const dispatch = useAppDispatch()

    const ChangeThemeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return (
        <AppBarWithButtons ChangeThemeMode={ChangeThemeMode}/>
    )
}