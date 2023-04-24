import { useState } from "react"

const style = {
    display: 'flex'
}



export const FilterDisplay = ({onFilter}) => {
    const handleClick = (e) => {
        onFilter(e)
    }
    return (
        <div style={ style }>
            <p onClick={()=>handleClick(1)}>Jour</p>
            <p onClick={()=>handleClick(2)}>Semaine</p>
            <p onClick={()=>handleClick(3)}>Mois</p>
        </div>
    )
}