import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider"


export const HomeLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();
    
    if(user){
        return <Navigate to="/user/dashboard" />;
    }

    return(
        <>
            <nav className="nav">
                <Link to="/">
                    <div className="icontainer">
                        <img className="icon" src="../../public/icon/home_icon.svg" alt="" />
                        <p>home</p>
                    </div>
                </Link>
                <Link to="/login">
                    <div className="icontainer">
                        <img className="icon" src="../../public/icon/login_icon.svg" alt="" />
                        <p>login</p>
                    </div>
                </Link>
                <Link to="/register">
                    <div className="icontainer">
                        <img className="icon" src="../../public/icon/register_icon.svg" alt="" />
                        <p>register</p>
                    </div>
                </Link>
            </nav>
            <section className="app">
                { outlet }
            </section>
        </>
    )
}