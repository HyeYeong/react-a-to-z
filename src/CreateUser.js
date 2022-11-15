import React from "react";

function CreateUser({username, email, onChange, onCreate}){
  return (
    <>
      <div>
        <input onChange={onChange} type="text" value={username} name="username" placeholder="name"/>
        <input onChange={onChange} type="text" value={email} name="email" placeholder="email"/>
      </div>
      <button onClick={onCreate}>ADD USER</button>
    </>

    )
}
export default React.memo(CreateUser)