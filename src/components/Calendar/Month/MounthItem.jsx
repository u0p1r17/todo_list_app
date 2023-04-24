import React, { useState, useRef } from 'react'
import { Calendar } from "calendar"

const liStyle = {
    width: '99.05vw',
    height: '44.6vh',
    scrollSnapAlign: 'start',
}

export const MounthItem = ({ id, date }) => {
    const [isVisible, setIsVisible] = useState(false)
    const itemRef = useRef(null)
    const cal = new Calendar(1)
    const year = date.getFullYear()
    const month = date.getMonth()
    const m = (year && month) !== null && cal.monthDates(year, month, (d) => ('' + d.getDate()).slice(-2)).map(el => el)
    const dateString = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: "long" })

    let reg = /[A-zÀ-ú0-9]+/g
    const string = dateString.match(reg)

    const display = m && m.map((eli, i) => {
        let style = isVisible ? { background: 'blue' } : { background: 'red' }
        return <ul key={i} className={`row row-${i + 1} numberday`} style={{
            display: 'flex',
            background: isVisible ? 'blue' : 'red'
        }} >
            {
                eli.map((elj, j) => {
                    return <li key={j} style={{
                        textAlign: 'center',
                        width: '100%',
                        border: '1px solid yellow',
                        height: '4vh'
                    }}>
                        <p>{elj}</p>
                    </li>
                })
            }
        </ul>
    })

    return (
        <div id={id} ref={itemRef} style={liStyle}>

            <h3> {string[0].toUpperCase()} {string[1].toUpperCase()} </h3>
            <ul className="row row-0 fullday" style={{
                display: 'flex',
            }}>
                <li style={{
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid yellow',
                    height: '4vh'
                }}> <p>Lun.</p> </li>
                <li style={{
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid yellow',
                    height: '4vh'
                }}> <p>Mar.</p> </li>
                <li style={{
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid yellow',
                    height: '4vh'
                }}> <p>Mer.</p> </li>
                <li style={{
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid yellow',
                    height: '4vh'
                }}> <p>Jeu.</p> </li>
                <li style={{
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid yellow',
                    height: '4vh'
                }}> <p>Ven.</p> </li>
                <li style={{
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid yellow',
                    height: '4vh'
                }}> <p>Sam.</p> </li>
                <li style={{
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid yellow',
                    height: '4vh'
                }}> <p>Dim.</p> </li>
            </ul>
            {
                display
            }
        </div>

    )
}