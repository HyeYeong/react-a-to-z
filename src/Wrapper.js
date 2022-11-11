import React from "react";

function Wrapper({children}){
  const style = {
    width: '100%',
    margin: '0',
    padding: '20px',
  }
  
  return (
  <div style={style}>
    {children}
  </div>
  )
}

export default Wrapper