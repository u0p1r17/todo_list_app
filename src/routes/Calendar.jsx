
// // import { useEffect } from "react"
// import { MonthLayout } from "../components/Calendar/MonthLayout"
// import { Agenda } from "../components/Calendar/Agenda"

// import '../css/calendar.css'
// // import '../css/agenda.css'
// import '../css/infiniteCalendar.css'
import { isBrowser, isDesktop, isMobile } from "react-device-detect"
import { DeskDeviceBehavior } from "../components/Calendar/DeskDeviceBehavior"
import { TouchDeviceBehavior } from "../components/Calendar/TouchDeviceBehavior"
import { useState } from "react"
import { v1 as uuidV1 } from "uuid"


// export const Cal = () => {
//     return (
//         <div className="container">
//             <h1>Calendrier des taches {isBrowser ? 'Browser' : isMobile ? 'Mobile' : null} </h1>
//             <div className="calendar" >

//                 <MonthLayout device={isBrowser ? 'browser' : isMobile ? 'mobile' : null} />

//             </div>
//         </div>
//     )
// }
export const Cal = () => {
    const [today, setToday] = useState(new Date())
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
    console.log(initTable(today))
    return (
        <>
            <h1>Desktop</h1>
            <DeskDeviceBehavior dateTableInit={initTable(today)} />
        </>
    )
    if (isDesktop) {
    } 
    else {
        return (
            <>
                <h1>Mobile</h1>
                <TouchDeviceBehavior dateTableInit={initTable(today)} />
            </>
        )
    }
}
