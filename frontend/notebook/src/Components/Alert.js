import React, { useContext } from 'react'
import alertContext from '../Contexts/alertContext'


const Alert = () => {
const {show}=useContext(alertContext)
    return (
        <nav className='sticky-top'>
            <div className={`alert alert-${show.type} sticky-top`} role="alert" hidden={show.val} style={{height:"50px"}}>
                {show.msg}
            </div>
        </nav>
    )
}

export default Alert
