import { Calendar } from "calendar"
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
// export const Month = ({ id, date, loadTop, loadBottom, touchTop, touchBottom, isTouch, device, visibleElem }) => {
export const Month = ({ id, date, visibleElem }) => {
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    const cal = new Calendar(1)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const m = (year && month) !== null && cal.monthDates(year, month, (d) => ('' + d.getDate()).slice(-2)).map(el => el)
    const dateString = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: "long" })
    // const y = year !== null && year
    // const d = day !== null && day
    let reg = /[A-zÀ-ú0-9]+/g
    const string = dateString.match(reg)


    // itemHeight && console.log(itemHeight)
    // containerHeight && console.log(containerHeight)
    // marginHeight && console.log(marginHeight)

    useEffect(() => {
        const observer = containerRef && new IntersectionObserver((entries) => {
            const [entry] = entries

            // console.log(entry)
            // console.log(entry.isIntersecting)
            if (entry.isIntersecting) {
                
                visibleElem({
                    entry: entry,
                    id: id
                })
            } else {
                
                
            }

            setIsVisible(entry.isIntersecting)
        }, {
            // root: containerRef.current.parentElement,
            // rootMargin: `${marginHeight}px 0 ${marginHeight}px 0`,
            // rootMargin: "-70px 0 -70px 0",
            // rootMargin: `${marginHeight}px`,
            // rootMargin: `-${view}px 0px -${view}px 0px` ,
            rootMargin: '0% 0px 0px 0%',
            threshold: 1
        })


        if (containerRef.current) {
            observer.observe(containerRef.current)
        }
        // console.log(observer.valueOf());

        return () => {
            if (containerRef.current) observer.disconnect()
        }
    }, [isVisible])
    // }, [])


    const display = m && m.map((eli, i) => {
        let style = isVisible ?{ background:'blue'} : {background:'red'}
        return <ul key={i} className={`row row-${i + 1} numberday`} style={style} >
            {
                eli.map((elj, j) => {
                    return <li key={j} >
                        <p>{elj}</p>
                    </li>
                })
            }
        </ul>
    })

    return (
        // <div className={isVisible ? "inView": "notInView"} ref={containerRef}>
        <div className={`month`} ref={containerRef} style={{ margin: '5em 0' }}>
            <h3> {string[0].toUpperCase()} {string[1].toUpperCase()} </h3>
            {/* <h3> {string[0].toUpperCase()} {string[1].toUpperCase()}  </h3> */}
            <ul className="row row-0 fullday">
                <li> <p>Lun.</p> </li>
                <li> <p>Mar.</p> </li>
                <li> <p>Mer.</p> </li>
                <li> <p>Jeu.</p> </li>
                <li> <p>Ven.</p> </li>
                <li> <p>Sam.</p> </li>
                <li> <p>Dim.</p> </li>
            </ul>
            {
                display
            }
            {/* <h3> {string[0].toUpperCase()} {string[1].toUpperCase()}  </h3> */}
            {/* <h3> {string[0].toUpperCase()} {string[1].toUpperCase()} {isVisible ? 'visible' : "not visible"} </h3> */}

        </div>
    )
}