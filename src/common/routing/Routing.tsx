import { Main } from "@/app/Main"
import { useAppSelector } from "@/common/hooks"
import { Login } from "@/features/auth/ui/Login/Login"
import { Route, Routes } from "react-router"
import {ProtectedRoute} from "@/common/components/ProtectedRoute/ProtectedRoute.tsx";
import {PageNotFound} from "@/common/components";
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice.ts";

export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*",
    Faq: '/faq'
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login}/>}>
                <Route path={Path.Main} element={<Main/>}/>
                <Route path={Path.Faq} element={<h2>FAQ</h2>}/>
            </Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggedIn}/>}>
                <Route path={Path.Login} element={<Login/>}/>
            </Route>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}

// export const Routing = () => {
//     const isLoggedIn = useAppSelector(selectIsLoggedIn)
//     return (
//         <Routes>
//             <Route element={<ProtectedRoute isAllowed={isLoggedIn}/>}>
//                 <Route path={Path.Main} element={<Main/>}/>
//                 <Route path={Path.Faq} element={<h2>FAQ</h2>}/>
//             </Route>
//
//             <Route path={Path.Login}
//                    element={
//                        <ProtectedRoute isAllowed={!isLoggedIn}>
//                            <Login/>
//                        </ProtectedRoute>}>
//             </Route>
//
//             <Route path={Path.NotFound} element={<PageNotFound/>}/>
//
//         </Routes>
//     )
// }