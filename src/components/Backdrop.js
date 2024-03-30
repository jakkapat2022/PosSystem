import React from 'react'
import styled from 'styled-components'

const BackDrop = styled.div`
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;

const Backdrop = ({ handle, show }) => {
  return (
    <BackDrop onClick={handle} show={show} className='back-drop'>
    </BackDrop>
  )
}

export default Backdrop
