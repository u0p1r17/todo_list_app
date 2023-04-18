export const RegisterPage = () => {
    return(
        <div className="container">
            <h1>Crée un compte</h1>
            <div className="composant register">
                <form className="form" action="">
                    <label htmlFor="prenom">Prenom</label>
                    <input type="text" id="prenom" name="prenom" placeholder="John"/>

                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom" placeholder="Doe"/>

                    <label htmlFor="age">Age</label>
                    <input type="text" id="age" name="age" placeholder="32"/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="johndoe@hotmail.com" />

                    <label htmlFor="pseudo">Pseudo</label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="jdoe"/>

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" />
                    
                    <button type="submit">inscription</button>
                </form>
            </div>
        </div>
    )
}