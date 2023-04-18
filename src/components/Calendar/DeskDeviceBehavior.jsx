import { useEffect, useRef, useState } from "react"
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

export const DeskDeviceBehavior = () => {
    const containerRef = useRef(null)
    const [today, setToday] = useState(new Date())
    const [table, setTable] = useState([...initTable(today)])
    // console.log(initTable(today))
    useEffect(() => {
        const element = containerRef.current.children[1]
        if (element) {
            element.scrollIntoView({
                block: 'start'
            })
        }
    }, [table])

    const handleDirection = (string) => {
        const inMiddle = table[1].number
        const direction = string
        const timeout = setTimeout(() => {
            let cache = [...table]
            if (direction === 'top') {
                cache.pop()
                setTable([
                    {
                        key: uuidV1(),
                        date: new Date(table[0].date.getFullYear(), table[0].date.getMonth() - 2)
                    },
                    ...cache,
                ])
                // setTable([
                //     {
                //         number: inMiddle - 2
                //     },
                //     ...cache
                // ])
            } else if (direction === 'bottom') {
                cache.shift()
                setTable([
                    ...cache,
                    {
                        key: uuidV1(),
                        date: new Date(table[0].date.getFullYear(), table[0].date.getMonth() + 2)
                    },
                ])
                // setTable([
                //     ...cache,
                //     {
                //         number: inMiddle + 2
                //     },
                // ])
            }

        }, 500);

    }

    const displayList = table && table.map((el, i) => {
        return <MounthItem key={i} id={i} date={el.date} fireDirection={handleDirection} />
    })
    console.log('display liste', displayList)
    return (
        <div ref={containerRef} style={ulStyle}>
            {
                displayList
            }
        </div>
    )

}