import React from 'react'
import './alertbox.css'

const AlertBox = ({message , handle}) => {
  return (
    <>
    <div className='back-drop'>
    </div>
    <div className='alert-box'>
      <div className='alert-content'>
        <div className='alert-message'>
            <h3>{message}</h3>
        </div>
      </div>
      <div className='alert-btn'>
        <button onClick={() => handle()}>ตกลง</button>
      </div>
    </div>
    </>
  )
}

export default AlertBox
