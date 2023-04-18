


export const SettingsPage = () => {
    return (
        <div className="container">
            <h1>Settings Pages</h1>
            <div className="composant settings">
                <form className="form" action="">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value="johndoe@hotmail.com" />
                    <label htmlFor="pseudo">Pseudo</label>
                    <input type="text" id="pseudo" name="pseudo" value="jdoe" />
                    <label htmlFor="password">Mot de passe</label>
                    <label htmlFor="password">Ancient mot de passe</label>
                    <input type="password" id="old-password" name="password" />
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input type="password" id="new-password" name="password" />
                    <label htmlFor="password">Confirmer mot de passe</label>
                    <input type="password" id="confirm-password" name="password" />
                </form>
            </div>
        </div>
    )
}