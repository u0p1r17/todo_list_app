import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { MounthItem } from "./MounthItem"
import { v1 as uuidV1 } from "uuid"
import { entries } from "lodash"

const ulStyle = {
    height: '45vh',
    overflow: 'scroll',
    overflowX: 'hidden',
    scrollSnapType: 'y mandatory',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    listStyle: 'none',
}

export const TouchDeviceBehavior = ({ dateTableInit }) => {
    const containerRef = useRef(null)
    const [table, setTable] = useState(dateTableInit)
    const [start, setStart] = useState(true)


    // const top = (array) => {
    //     array.pop()
    //     array = [
    //         {
    //             key: uuidV1(),
    //             date: new Date(array[0].date.getFullYear(), array[0].date.getMonth() - 1)
    //         },
    //         ...array,
    //     ]
    //     return array
    // }
    // const bottom = (array) => {
    //     array.shift()
    //     array = [
    //         ...array,
    //         {
    //             key: uuidV1(),
    //             date: new Date(array[1].date.getFullYear(), array[1].date.getMonth() + 1)
    //         },
    //     ]
    //     return array
    // }

    const observer = new IntersectionObserver((entries, observer) => {
        const cache = [...table]
        const element = containerRef.current.children[1]
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    if (entry.isIntersecting) {
                        if (entry.target.id === '0') {
                            cache.pop()
                            setTable([
                                {
                                    key: uuidV1(),
                                    date: new Date(cache[0].date.getFullYear(), cache[0].date.getMonth() - 1)
                                },
                                ...cache,
                            ])
                            observer.disconnect()
                        } else if (entry.target.id === '2') {
                            cache.shift()
                            setTable([
                                ...cache,
                                {
                                    key: uuidV1(),
                                    date: new Date(cache[1].date.getFullYear(), cache[1].date.getMonth() + 1)
                                },
                            ])
                            observer.disconnect()
                        }
                        if (element) {
                            element.scrollIntoView()
                        }
                    }
                }, 500);
            }
        })
        
    }, {
        threshold: 0.97
    })

    useLayoutEffect(() => {
        const element = containerRef.current.children[1]
        
        if (start) {
            element.scrollIntoView()
            setStart(false)
        }
        
        observer.observe(containerRef.current.children[0])
        observer.observe(containerRef.current.children[2])
    }, [table])

    const displayList = table.map((el, i) => {
        return <MounthItem key={el.key} id={i} date={el.date} />
        // return <MounthItem key={el.key} id={i} date={el.date} fireDirection={handleFireDirection} />
    })

    return (
        <div ref={containerRef} style={ulStyle} >
            {
                displayList
            }
        </div>
    )

}