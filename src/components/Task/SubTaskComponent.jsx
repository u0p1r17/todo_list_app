import { useEffect, useRef, useState } from "react"

export const SubTaskComponent = ({id,delSubTask,input}) => {
    let [val, setVal] = useState(input)

    console.log()
    const handleClick = (e) => {
        e.preventDefault()
        console.log(id)
        delSubTask(id)
    }
    return (
        <>
            <input name="subTask" type="text" placeholder={`salut ${id}`} onChange={e=>setVal(e.target.value)} value={val} />
            <button onClick={(e)=>handleClick(e)}>-</button>
        </>
    )
}