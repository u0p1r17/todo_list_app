import { useEffect, useRef, useState } from "react"
import { MounthItem } from "./MounthItem"
import { v1 as uuidV1 } from "uuid"

const ulStyle = {

    height: '45vh',
    overflow: 'scroll',
    overflowX: 'hidden',
    scrollSnapType: 'y mandatory',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    listStyle: 'none',
}

const initTable = (today) => {
    let cache = []
        for (let i = -1; i <= 1; i++) {
            cache = [
                ...cache,
                {
                    key: uuidV1(),
                    date: new Date(today.getFullYear(), today.getMonth() + (i))
                }
            ]
        }
        return cache
}

export const TouchDeviceBehavior = () => {
    const containerRef = useRef(null)
    const [today, setToday] = useState(new Date())
    const [table, setTable] = useState([...initTable(today)])
    const [direction, setDirection] = useState('')

    // useEffect(() => {
    //     const element = containerRef.current.children[1]
    //     if (element) {
    //         element.scrollIntoView({
    //             behavior: 'smooth',
    //             inline: 'center'
    //         })
    //     }
    //     return () => {
    //         setDirection('')
    //     }
    // }, [table])
     useEffect(() => {
        const element = containerRef.current.children[1]
        if (element) {
            element.scrollIntoView({
                block: 'start'
            })
        }
        return () => {
            setDirection('')
        }
    }, [table])

    const handleDirection = (string) => {
        const direction = string
        console.log(string)
        setDirection(direction)
    }

    const handleTouchEnd = () => {
        const inMiddle = table[1].number
        let cache = [...table]
        console.log(direction)
        if (direction === 'top') {
            cache.pop()
            setTable([
                {
                    key: uuidV1(),
                    date: new Date(table[0].date.getFullYear(), table[0].date.getMonth() - 2)
                },
                ...cache,
            ])
            

        } else if (direction === 'bottom') {
            cache.shift()
            setTable([
                ...cache,
                {
                    key: uuidV1(),
                    date: new Date(table[0].date.getFullYear(), table[0].date.getMonth() + 2)
                },
            ])
        }
    }




    const displayList = table && table.map((el, i) => {
        return <MounthItem key={i} id={i} date={el.date} fireDirection={handleDirection} />
    })

    return (
        <div ref={containerRef} style={ulStyle} onTouchEnd={handleTouchEnd}>
            {
                displayList
            }
        </div>
    )

}