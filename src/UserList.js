import React from "react";

const User = React.memo(function({user, onRemove, onToggle}) {
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
})

function UserList({users, onRemove, onToggle}){
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
export default React.memo(UserList)