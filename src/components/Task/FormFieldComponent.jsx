const capitalizeWord = (str) => {
    const regex = /(?!([\W\d]))\b(\w)/
    const firstLetter = str.match(regex)
    const upperCase = firstLetter[0].toUpperCase()
    str = str.replace(firstLetter[0],upperCase)
    return str
}

export const InputFieldComponent = ({id,type,description,label}) => {
    
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={id} id={id} placeholder={description} />
        </>
    )
}

export const TextAreaFieldComponent = ({id,label,description}) => {
    return <>
        <label htmlFor={id}>{label}</label>
        <textarea name={id} id={id} placeholder={description}></textarea>
    </>
}

export const SelectFieldComponent = ({id,type,description,label,options}) => {
    const group = options && options.map((el,i)=>{
        return <option key={i} value={el}>{capitalizeWord(el)}</option>
    })
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <select name={id} id={id} >
                <option value="default" defaultChecked>Selection du {id}</option>
                {
                    group
                }
            </select>
        </>
    )
}