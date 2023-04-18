import { Link, Navigate, Outlet, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();
    if(!user){
        return <Navigate to="/" />;
    }
    return (
        <>
            <nav className="nav">
                <Link to="dashboard">Home</Link>
                <Link to="settings">Settings</Link>
                <Link to="calendar">Calendrier</Link>
                <Link to="logout">Logout</Link>
            </nav>
            <div className="app">
                { outlet }
            </div>
        </>
    )
}