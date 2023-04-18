
// // import { useEffect } from "react"
// import { MonthLayout } from "../components/Calendar/MonthLayout"
// import { Agenda } from "../components/Calendar/Agenda"

// import '../css/calendar.css'
// // import '../css/agenda.css'
// import '../css/infiniteCalendar.css'
import { isBrowser, isDesktop, isMobile } from "react-device-detect"
import { DeskDeviceBehavior } from "../components/Calendar/DeskDeviceBehavior"
import { TouchDeviceBehavior } from "../components/Calendar/TouchDeviceBehavior"


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
    if (isDesktop) {
        return (
            <>
                <h1>Desktop</h1>
                <DeskDeviceBehavior />
            </>
        )
    } 
    else {
        return (
            <>
                <h1>Mobile</h1>
                <TouchDeviceBehavior />
            </>
        )
    }
}
