import React, { useState } from "react";

function InputSample(){
  const [data, setData] = useState({
    name: '',
    nickname: ''
  })
  const {name, nickname} = data

  const handleChange = (e) => {
    const {value, name} = e.target
    setData({
      ...data,
      [name]: value,
      
    })
  }


  const inputReset = () => setData({
    name: '',
    nickname:''
  })
  return (
  <div>
    <input type="text" onChange={handleChange} value={name} name="name" placeholder={"이름을 입력해주세요"}/>
    <input type="text" onChange={handleChange} value={nickname} name="nickname" placeholder={"닉네임을 입력해주세요"}/>
    <button onClick={inputReset}>Reset</button>
    <br/>
    <p>{name}, {nickname}</p>
    
  </div>)
}
InputSample.defaultProps = {
  data: 'anonymous'
}
export default InputSample