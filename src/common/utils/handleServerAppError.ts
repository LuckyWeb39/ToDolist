import {setAppErrorAC, setAppStatusAC} from "@/app/app-slice.ts";
import {BaseResponse} from "@/common/types";
import {Dispatch} from "@reduxjs/toolkit";

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
    if (data.messages.length){
        dispatch(setAppErrorAC({ error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({ error: 'Some error occurred' }))
    }
    dispatch(setAppStatusAC({ status: 'failed' }))
}