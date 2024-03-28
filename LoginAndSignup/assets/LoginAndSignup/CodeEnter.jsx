import React from 'react'
import "../../style/CodeEnter.css"


function CodeEnter() {
  return (
    <>
    <div className="EnteringCode">
        <p>Enter the code </p>
        <div className="sendCode">
        <input  type='text' className='code'  />
        <button className='vf'>Verify</button>
        </div>
       
    </div>
    </>
  )
}

export default CodeEnter;