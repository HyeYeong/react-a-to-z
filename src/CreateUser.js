import React, { useContext, useRef, useCallback } from "react";
import useInputs from './hook/useInputs'
import { UserDispatch } from './App'

const CreateUser = () => {
  const dispatch = useContext(UserDispatch)
  const nextId = useRef(4);
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });
  const onCreate = () => {
    dispatch({
      type: 'CREATE_USER',
      users: {
        id: nextId.current,
        username,
        email
      }
    })
    reset()
    nextId.current += 1;
  };

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