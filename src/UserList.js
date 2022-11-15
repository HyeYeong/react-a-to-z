import React, { useContext } from "react";
import { UserDispatch } from './App'

const User = React.memo(function({user}) {
  const dispatch = useContext(UserDispatch)
  return (
    <div key={user.id}>
      <span 
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => {
          dispatch({type: 'TOGGLE_USER', id: user.id})
        }}
        >
          {user.username} 
      </span>
      ({user.email})
      <button onClick={() => {
        dispatch({type: 'DELETE_USER', id: user.id})
      }}>DELETE</button>
    </div>
  )
})

function UserList({users}){
  return (
  <>
    {users.map(user => (
      <User
        user={user}
        key={user.id}
      />
    ))}
  </>)
}
export default React.memo(UserList)