import React, {useState} from "react";

function Count(){
  const [count, setCount] = useState(0)
  const increase = () => {
    setCount(num => num + 1)
  }
  const decrease = () => {
    setCount(num => num - 1)
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  )
}
export default Count