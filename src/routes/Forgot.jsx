export const Forgot = () => {
    return (
        <div className="container">
            <h1>Vous avez oublier votre mot de passe</h1>
            <div className="composant forgot">
                <form action="" className="form">
                    <label htmlFor="email">Entrez votre email</label>
                    <input type="email" name="email" id="email" />
                    <button type="submit">Envoyer un mail de recupération</button>
                </form>
            </div>
        </div>
    )
}