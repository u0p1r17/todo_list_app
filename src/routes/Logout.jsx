import { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider"

export const Logout = () => {
    const { logout } = useAuth();
    useEffect(()=>{
        logout()
    },[])
    return (
        <>
        </>
    )
}