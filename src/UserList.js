import React, { useEffect } from "react";

function UserList({users, onRemove, onToggle}){
  function User ({user, onRemove}) {
    return (
      <div key={user.id}>
        <span 
          style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
          }}
          onClick={() => onToggle(user.id)}
          >
            {user.username} 
        </span>
        ({user.email})
        <button onClick={() => onRemove(user.id)}>DELETE</button>
      </div>
    )
  }

  return (
  <>
    {users.map(user => (
      <User
        user={user}
        key={user.id}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    ))}
  </>)
}
export default UserList