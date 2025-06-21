import {RootState} from "../../../app/store.ts";
import {ThemeValue} from "./appReducer.ts";


export const selectorApp = (state: RootState): ThemeValue => {
    return state.app.themeMode
}