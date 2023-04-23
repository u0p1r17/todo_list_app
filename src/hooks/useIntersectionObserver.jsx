import { useEffect, useState } from "react"

export const useIntersectionObserver = (state) => {
    const [table, setTable] = useState(state)
    const observer = new IntersectionObserver((entries, observer) => {
        const cache = [...table]

        entries.forEach((entry, i) => {
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
            }
        })
        // if (element) {
        //     element.scrollIntoView()
        // }
    }, {
        threshold: 0.97
    })
   
    const observe = (arg) => observer.observe(arg)
    return [table , observe]
}