// import { useSpring, animated, useSpringValue, useInView } from '@react-spring/web'
import { useEffect, useState, useRef } from 'react'
import { debounce, throttle } from 'lodash'
import { Calendar } from "calendar"

const liStyle = {
    // display:'flex',
    // flexDirection:'column',
    width:'99.05vw',
    height: '44.6vh',
    
    scrollSnapAlign: 'start',

    // backgroundColor: isVisible ? 'blue': 'black'
}

export const MounthItem = ({ id, date, fireDirection }) => {
    const [isVisible, setIsVisible] = useState(false)
    const itemRef = useRef(null)
    const cal = new Calendar(1)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date?.getDay()
    const m = (year && month) !== null && cal.monthDates(year, month, (d) => ('' + d.getDate()).slice(-2)).map(el => el)
    const dateString = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: "long" })
    // const y = year !== null && year
    // const d = day !== null && day
    let reg = /[A-zÀ-ú0-9]+/g
    const string = dateString.match(reg)
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries
        if (entry.isIntersecting && id === 0) {
            fireDirection('top')
        }
        if (entry.isIntersecting && id === 2) {
            fireDirection('bottom')
        }

        setIsVisible(entry.isIntersecting)
    }, {
        threshold: 0.7
    })


    useEffect(() => {

        if (itemRef.current) {
            observer.observe(itemRef.current)
        }
        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current)
            }

        }
    }, [isVisible])



    const display = m && m.map((eli, i) => {
        let style = isVisible ?{ background:'blue'} : {background:'red'}
        return <ul key={i} className={`row row-${i + 1} numberday`} style={{
            display: 'flex',
        }} >
            {
                eli.map((elj, j) => {
                    return <li key={j} style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}>
                        <p>{elj}</p>
                    </li>
                })
            }
        </ul>
    })

    return (
        // <animated.section ref={ref} style={liStyle}>{id} {inView ? 'hello' : null}</animated.section>
        <div ref={itemRef} style={liStyle}>
            <h1>{}{isVisible ? ' isVisible' : ' notVisible'}</h1>
            <h3> {string[0].toUpperCase()} {string[1].toUpperCase()} </h3>
            {/* <h3> {string[0].toUpperCase()} {string[1].toUpperCase()}  </h3> */}
            <ul className="row row-0 fullday" style={{
                display:'flex',

            }}>
                <li style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}> <p>Lun.</p> </li>
                <li style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}> <p>Mar.</p> </li>
                <li style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}> <p>Mer.</p> </li>
                <li style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}> <p>Jeu.</p> </li>
                <li style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}> <p>Ven.</p> </li>
                <li style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}> <p>Sam.</p> </li>
                <li style={{
                        textAlign:'center',
                        width:'100%',
                        border:'1px solid yellow',
                        height:'4vh'
                    }}> <p>Dim.</p> </li>
            </ul>
            {
                display
            }
        </div>

    )
}