import { Path } from "@/common/routing"
import { Navigate, Outlet } from "react-router"

type Props = {
    isAllowed: boolean
    redirectPath?: string
}

export const ProtectedRoute = ({ isAllowed, redirectPath = Path.Main }: Props) => {
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />
}







// import {Navigate, Outlet} from "react-router";
// import {Path} from "@/common/routing";
// import {ReactNode} from "react";
//
// type Props = {
//     children?: ReactNode
//     isAllowed: boolean;
//     redirectPath?: string;
// }
//
// export const ProtectedRoute = ({children, isAllowed, redirectPath = Path.Main}: Props) => {
// debugger
//     if (isAllowed) {
//         return <Navigate to={redirectPath}/>
//     }
//     return children ? children : <Outlet/>
// }