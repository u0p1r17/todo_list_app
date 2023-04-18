import { useState } from "react"
import uuid from "react-uuid"
import { SubTaskComponent } from "./SubTaskComponent"

export const SubTaskContainer = () => {
    const [subTask, setSubTask] = useState([
        {
            id: uuid(),
            title:'',
            input:'&é"'
        },
        {
            id: uuid(),
            title:'',
            input:'123'
        },
        {
            id: uuid(),
            title:'',
            input:'azer'
        },
    ])
    const onChange = (el,index) => {
        subTask[index] = {
            ...subTask[index],
            input: el
        }
    }
    

    const handleDelSubTask = (index) => {
        let cpTask = [...subTask]

        setSubTask(cpTask.filter(el=> el.id !== index))
        console.log('inside subTask before',subTask)
        console.log('inside cpTask after',cpTask)
    }
    
    const handleAddSubTask = (e) => {
        e.preventDefault()
        let key = uuid()
        setSubTask([
            ...subTask, 
            {
                id:key,
                title:'',
                input:''
            } 
        ])
    }
    return (
        <>
            <label htmlFor="underTask">Sous tache</label>
            <button onClick={(e)=>handleAddSubTask(e)}>Ajouter une sous-tache</button><br />
            <div>
                {
                    subTask.map(el=>{
                        return <SubTaskComponent key={el.id} id={el.id} input={el.input} delSubTask={handleDelSubTask} />
                    })
                }
            </div>
        </>
    )
}



