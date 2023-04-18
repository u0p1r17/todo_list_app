import { createBrowserRouter, createRoutesFromElements, defer, NavLink, Route, Routes } from "react-router-dom";
import { LoginPage } from "./routes/Login"
import { Home } from "./routes/Home"
import { SettingsPage } from "./routes/Settings";
import { ProtectedLayout } from "./Layouts/ProtectedLayout";
import { HomeLayout } from "./Layouts/HomeLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Logout } from "./routes/logout";
import { RegisterPage } from "./routes/Register";
import { Forgot } from "./routes/Forgot";
import { Dashboard } from "./routes/Dashboard";
import { NewTaskForm } from "./routes/NewTaskForm";
import { Cal } from "./routes/Calendar";


const getUserData = () => {
    new Promise((resolve)=> {
        setTimeout(()=>{
            const user = window.localStorage.getItem("user");
            resolve(user)
        }, 3000)
    })
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route 
            element={<AuthLayout />}
            loader={()=> defer({ userPromise: getUserData() })}    
        >
            <Route element={<HomeLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            
            <Route path="/user" element={<ProtectedLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/newtask" element={<NewTaskForm />} />
                <Route path="calendar" element={<Cal />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="logout" element={<Logout />} />
            </Route>
        </Route>
    )
)



// export const App = () => {
//     return (
//         <>
//             <Routes>
//                 <Route path="/" element={<HomePage/>} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/register" element={<SignUpPage />} />
//                 <Route path="/forgot" element={<Forgot />} />
//                 <Route path="/dashboard" element={<ProtectedLayout />}>
//                     <Route path="profile" element={<ProfilePage/>} />
//                     <Route paht="settings" element={<SettingsPage/>} />
//                 </Route>
//                 {/* <Route 
//                     path="/profile"
//                     element={
//                         <ProtectedRoute>
//                             <ProfilePage />
//                         </ProtectedRoute>
//                     }
//                 />
//                 <Route
//                     path="/settings"
//                     element={
//                         <ProtectedRoute>
//                             <SettingPage/>
//                         </ProtectedRoute>
//                     }
//                 /> */}
//             </Routes>
//         </>
//     )
// }