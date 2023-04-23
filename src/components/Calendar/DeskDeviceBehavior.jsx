import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { MounthItem } from "./MounthItem"
import { v1 as uuidV1 } from "uuid"

const ulStyle = {
    height: '45vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    scrollSnapType: 'y mandatory',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    listStyle: 'none',
}

export const DeskDeviceBehavior = ({ dateTableInit }) => {
    const containerRef = useRef(null)
    const [table, setTable] = useState(dateTableInit)
    const [start, setStart] = useState(true)

    const observer = new IntersectionObserver((entries, observer) => {
        const cache = [...table]
        const element = containerRef.current.children[1]
        entries.forEach((entry) => {
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
            }, 300);
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

    const displayList = table && table.map((el, i) => {
        return <MounthItem key={i} id={i} date={el.date} />
    })

    return (
        <div ref={containerRef} style={ulStyle}>
            {
                displayList
            }
        </div>
    )

}


// const timeout = setTimeout(() => {
//     let cache = [...table]
//     if (direction === 'top') {
//         cache.pop()
//         setTable([
//             {
//                 key: uuidV1(),
//                 date: new Date(cache[0].date.getFullYear(), cache[0].date.getMonth() - 1)
//             },
//             ...cache,
//         ])
        
//     } else if (direction === 'bottom') {
//         cache.shift()
//         setTable([
//             ...cache,
//             {
//                 key: uuidV1(),
//                 date: new Date(cache[1].date.getFullYear(), cache[1].date.getMonth() + 1)
//             },
//         ])
//     }

// }, 500);
 // console.log(initTable(today))
    // useEffect(() => {
    //     const element = containerRef.current.children[1]
    //     if (element) {
    //         element.scrollIntoView({
    //             block: 'start'
    //         })
    //     }
    // }, [table])

    // const handleDirection = (string) => {
    //     const inMiddle = table[1].number
    //     const direction = string
    //     const timeout = setTimeout(() => {
    //         let cache = [...table]
    //         if (direction === 'top') {
    //             cache.pop()
    //             setTable([
    //                 {
    //                     key: uuidV1(),
    //                     date: new Date(cache[0].date.getFullYear(), cache[0].date.getMonth() - 1)
    //                 },
    //                 ...cache,
    //             ])
                
    //         } else if (direction === 'bottom') {
    //             cache.shift()
    //             setTable([
    //                 ...cache,
    //                 {
    //                     key: uuidV1(),
    //                     date: new Date(cache[1].date.getFullYear(), cache[1].date.getMonth() + 1)
    //                 },
    //             ])
    //         }

    //     }, 500);

    // }