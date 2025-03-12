import React, { useState } from 'react'
import alertContext from './alertContext'


const AlertState = (props) => {
    const [show,setShow]=useState({msg:"",type:"",val:true})
    const showAlert =(msg,type)=>{
        setShow({msg,type,val:false});
        setTimeout(() => {
            setShow({msg:"",type:"",val:true});
        }, 1500);
    }
  
    
  return (
    <alertContext.Provider value={{show,showAlert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default AlertState

