import { Link } from "react-router-dom"


export const Dashboard = () => {
    return(
        <div className="container">
            <h1>This is the Home Page</h1>

                <div className="composant tache">
                    <div className="title">
                        <h3>Taches box</h3>
                        <span><a href="#">voir tout</a></span>
                    </div>
                    <div className="accomplissement">
                        <p>15% des taches sont acomplit</p>
                        <p>il vous reste 20 taches en atente</p>
                    </div>
                    <div>
                        <ul>
                            <li>appeler le directeur</li>
                            <li>acheter du lait</li>
                            <li>envoyer la tv en reparation</li>
                        </ul>
                    </div>
                </div>
                <div className="composant quotidien">
                    <div className="title">
                        <h3>Ajourd'hui</h3>
                        <span><a href="#">voir tout</a></span>
                    </div>
                    <div className="accomplissement">
                        <p>5% acomplit</p>
                    </div>
                    <div>
                        <ul>
                            <li><p>reveil <span className="heure">8h00</span></p></li>
                            <li><p>preparer le déjeuner <span className="heure">8h30</span></p></li>
                            <li><p>aller a la salle de sport <span className="heure">9h00</span></p></li>
                        </ul>
                        <hr className="now"/>
                    </div>
                </div>
                <button>Nouvelle taches</button>
                <Link className="newtask" to="newtask" replace="true" >Nouvelle taches</Link>
        </div>
    )
}