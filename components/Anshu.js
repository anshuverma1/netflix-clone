import React, {useState} from "react";

const MyComponent = () => {

    const [name, setName]=useState('')

    const handleClick = (event) => {
        setName((value)=> {
            return ...value
        })
    }

    return (
        <div>
            <p onClick={handleClick} >My name is {name}</p>
        </div>
    )
}