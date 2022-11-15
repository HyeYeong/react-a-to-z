import React from "react";

function UserList({users, onRemove, onToggle}){
  function User ({user, onRemove}) {
    return (
      <div key={user.id} onClick={() => onToggle(user.id)}>
        <span 
          style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
          }}
          >
            {user.username} ({user.email})
        </span>
        <button onClick={() => onRemove(user.id)}>DELETE</button>
      </div>
    )
  }

  return (
  <>
    {users.map((user) => <User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle}/>)}
  </>)
}
export default UserList