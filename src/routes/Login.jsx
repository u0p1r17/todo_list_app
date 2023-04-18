
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export const LoginPage = () => {
    const { login } = useAuth();

    const handleSubmit =(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        login({
            email: data.get("email"),
            password: data.get("password")
        })
    }

    return (
        <div className="container">
            <h1>
                Log In
            </h1>
            <div className="composant">
                <form className="form" onSubmit={handleSubmit}>

                    <label htmlFor="email">email</label>
                    <input 
                        required
                        id="email"
                        name="email"
                        placeholder="email"

                        // type="email"
                    />
                    <label htmlFor="password">password
                    </label>
                    <input 
                        required
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <button 
                        type="submit"
                    >
                        Login in
                    </button>
                    <div className="problem">
                        <Link to="/register">Pas De compte?</Link>
                        <Link to="/forgot">Mot de passe oublié?</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}