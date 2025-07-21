import {createAppSlice} from "@/common/utils";
import {LoginInputs} from "@/features/auth/lid/schemas";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {handleServerNetworkError} from "@/common/utils/handleServerNetworkError.ts";
import {authApi} from "@/features/auth/api/authApi.ts";
import {ResultCode} from "@/common/enums";
import {handleServerAppError} from "@/common/utils/handleServerAppError.ts";
import {AUTH_TOKEN} from "@/common/constants";
import {clearDataAC} from "@/common/common";

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: create =>({
        loginTC: create.asyncThunk(
            async (data: LoginInputs, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await authApi.login(data)

                    if (res.data.resultCode === ResultCode.Success ) {
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        localStorage.setItem(AUTH_TOKEN,res.data.data.token)
                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (err) {
                    handleServerNetworkError(err, thunkAPI.dispatch)
                    console.log(err)
                    return thunkAPI.rejectWithValue(null)
                }
        },
            {
                fulfilled: (state,action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }),

        logoutTC: create.asyncThunk(
            async (_,thunkAPI)=>{
            try {
                thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                const res = await authApi.logout()
                if (res.data.resultCode === ResultCode.Success){
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    localStorage.removeItem(AUTH_TOKEN)
                    thunkAPI.dispatch(clearDataAC())
                    return {isLoggedIn: false}
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            } catch (err){
                handleServerNetworkError(err, thunkAPI.dispatch)
                console.log(err)
                return thunkAPI.rejectWithValue(null)
            }
        },
            {fulfilled: (state,action)=>{
                    state.isLoggedIn = action.payload.isLoggedIn
                }}
        ),
        initializeAppTC: create.asyncThunk(
            async (_, thunkAPI)=>{
            try {
                thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                const res = await authApi.me()

                if (res.data.resultCode === ResultCode.Success ) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return {isLoggedIn: true}
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            } catch (err){
                handleServerNetworkError(err, thunkAPI.dispatch)
                console.log(err)
                return thunkAPI.rejectWithValue(null)
            }
        },
            {
                fulfilled: (state,action)=>{
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
            )
    }),
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    }
})

export const {selectIsLoggedIn} = authSlice.selectors
export const {loginTC, logoutTC, initializeAppTC} = authSlice.actions
export const authReducer = authSlice.reducer