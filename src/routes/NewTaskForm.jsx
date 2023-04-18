
import { useEffect, useLayoutEffect, useState } from "react"
import uuid from "react-uuid"
import { InputFieldComponent, SelectFieldComponent, TextAreaFieldComponent } from "../components/Task/FormFieldComponent"
import { SubTaskContainer } from "../components/Task/SubTaskContainer"
import { group } from "../data/group"

export const NewTaskForm = () => {
    const [form,setForm] = useState({
        title:'',
        group:'',
        sub:[],
        deadline: null,
        anniversary: false
    })
    const [groupe,setGroupe] = useState()
    useEffect(()=>{
        setGroupe(group())
    },[])
    const handleSelect = (e) => {
        console.log(e)
    }
    // let element = subTask.map((el,i)=>{
    //     el.id = i
    //     return <SubTaskComponent key={i} id={el.id} data={el} text={el.input} delSubTask={handleDelSubTask} onChange={onChange} />
    // })
    
    const handleSubmit = (e) => {
        // localStorage.removeItem('data')
        e.preventDefault()
        let items = {
            title: e.target.elements.title.value,
            group: e.target.elements.groupe.value,
            description: e.target.elements.description.value,
            sub:[...Array.from(e.target.elements.subTask).map(el=>el.value)],
            deadline: e.target.elements.deadline.value,
            anniversary: e.target.elements.anniversary.checked
        }
        if(!localStorage.getItem('data'))(
            localStorage.setItem('data',JSON.stringify([]))
        )
        localStorage.setItem('data',JSON.stringify( [...JSON.parse(localStorage.getItem('data')), items] ))
        
        console.log(JSON.parse(localStorage.getItem('data')))


    }
    console.log('render new task')
    return (
        <div className="container">
            <h1>Creé une nouvel taches</h1>
            <div className="composant new-task">
                <form className="form" onSubmit={(e)=>handleSubmit(e)} action="">
                    
                    <InputFieldComponent id={'title'} type={'text'} label={'Titre de la tache'} description={'faire les courses'} />
                    <SelectFieldComponent id={'groupe'} type={'select'} label={'Groupe'} description={'faire les courses'} options={groupe} />
                    <TextAreaFieldComponent id={'description'} label={'Description'} description={'Une description de la tache a faire'}/>
                    <SubTaskContainer />
                    

                    <label htmlFor="deadline">Echéance</label>
                    <input type="datetime-local" name="deadline" id="deadline" placeholder="faire les courses" />
                    
                    <label htmlFor="anniversary">Anniversaire</label>
                    <input type="checkbox" name="anniversary" id="anniversary" placeholder="faire les courses" />
                    <button type="submit">Cree tache</button>
                </form>
            </div>
        </div>
    )
}