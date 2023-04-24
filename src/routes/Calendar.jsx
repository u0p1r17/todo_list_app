import { FilterDisplay } from "../components/Calendar/FilterDisplay"
import { DisplayMonthly } from "../components/Calendar/Month/DisplayMonthly"
import { DisplayWeekly } from "../components/Calendar/Week/DisplayWeekly"
import { useState } from "react"
import { v1 as uuidV1 } from "uuid"

export const Cal = () => {
    const [today] = useState(new Date())
    const [filter, setFilter] = useState(3)
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

    const handleFilter = (number) => {
        setFilter(number)
    }
    switch (filter) {
        case 1:
            console.log("1")
            break;
    
        case 2:
            console.log("2")
            break;
    
        case 3:
            console.log("3")
            break;
    
        default:
            break;
    }
    return (
        <>
            <h1>Desktop</h1>
            <DisplayWeekly />
            <DisplayMonthly dateTableInit={initTable(today)} />
            <FilterDisplay onFilter={handleFilter} />
        </>
    )
}
