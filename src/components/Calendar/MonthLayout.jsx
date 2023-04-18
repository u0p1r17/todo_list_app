
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useScrollDirection } from "react-use-scroll-direction"
import { v1 as uuidV1 } from "uuid"
import { Month } from "./Month"
import { debounce } from "lodash"
import CustomScroll from "react-customizable-scroll"

import '../../css/react-customizable-scroll.css'
import ReactInfiniteCalendar from "react-infinite-calendar"
import { flushSync } from "react-dom"

// import "../../css/monthLayout.css"

export const MonthLayout = ({ device }) => {
    const [today, setToday] = useState(new Date())
    const [table, setTable] = useState()
    const [direction, setDirection] = useState(0)
    const [start, setStart] = useState(true)
    const containerRef = useRef(null)

    useEffect(() => {
        let cache = []
        for (let i = -2; i <= 2; i++) {
            cache = [
                ...cache,
                {
                    key: uuidV1(),
                    date: new Date(today.getFullYear(), today.getMonth() + (i))
                }
            ]
        }
        
        setTable([
            ...cache
        ])

        return () => {
            setTable([])
            // setIsTouch(null)
        }
    }, [])

    useEffect(() => {
        if (containerRef.current && table) {
            if(start){
                containerRef.current.children[2].scrollIntoView({
                    behavior:'auto',
                    block:'center'
                })
                setStart(false)
            }
            // containerRef.current.scrollTo({
            //     top: 700,
            //     // top: (containerRef.current.clientHeight / 2) + (containerRef.current.children[1].clientHeight) ,
            //     behavior: 'auto'
                
            // })
        }
    }, [table])



    const loadingTop = () => {

        let cache = [
            ...table,
        ]

        cache.pop()
        setTable([
            {
                key: uuidV1(),
                date: new Date(table[0].date.getFullYear(), table[0].date.getMonth() - 1)
            },
            ...cache,
        ])
        containerRef.current.children[2].scrollIntoView(true,{
            behavior:'smooth',
            block:'center'
        })
        // containerRef.current.scrollTo({
        //     top: 700,
        //     // top: (containerRef.current.clientHeight / 2) + (containerRef.current.children[1].clientHeight) ,
        //     behavior: 'auto'
            
        // })
    }

    const loadingBottom = () => {

        let cache = [
            ...table,
        ]
        // cache.shift()
        setTable([
            ...cache,
            {
                key: uuidV1(),
                date: new Date(table[table.length - 1].date.getFullYear(), table[table.length - 1].date.getMonth() + 1)
            },
        ])
    }
    
    const handleVisibleElement = (elem) => {
        // loadingTop()
        if(elem.id >= 1){
            // containerRef.current.children[1].scrollIntoView({
            //     behavior:'instant'
            // })
            // loadingTop()
            setDirection(1)
        }
        // console.log(elem);
        // // console.log(elem.entry, elem.id)
    }

    const handleTouchStart = () => {
        if(direction !== 0){
            setDirection(0)
        }
    }
    const handleTouchEnd = () => {
        if(direction >= 1) {
            loadingTop()
        } else if (direction === 3){

        }
    }

    const display = table && table.map((el, i) => {
        return <Month key={el.key} id={i} date={el.date} visibleElem={handleVisibleElement} />
    })

    return (
        <div className="months" >
            <button style={{position:'absolute', zIndex:'4000'}} onClick={loadingTop}>click</button>
            <div className="hiddeBoxTop"></div>
            <ul className="box-scroll" style={{ overflowY: 'scroll' }} ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
                {
                    display
                }
            </ul>
            <div className="hiddeBoxBottom"></div>
            <button style={{position:'absolute', bottom:'0'}} onClick={loadingBottom}>click</button>
        </div>
    )
}
