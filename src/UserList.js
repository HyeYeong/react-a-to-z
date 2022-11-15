import React, { useEffect } from "react";

function UserList({users, onRemove, onToggle}){
  function User ({user, onRemove}) {
    useEffect(() => {
      console.log('컴포넌트가 화면에 나타남')
      console.log(user)
      return () => {
        console.log('컴포넌트가 화면에서 사라짐')
        console.log(user)
      }
      // 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열 (deps)을 넣는다.
      // 빈 배열인 경우, 컴포넌트가 처음 나타날 때만 useEffect에 등록한 함수가 호출됨.
      // useEffect 에서는 함수를 반환 할 수 있는데 이를 cleanup 함수라고 부릅니다. cleanup 함수는 useEffect 에 대한 뒷정리를 해준다고 이해하시면 되는데요, deps 가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출된다.
      // deps 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출이 됩니다.
    }, [user])
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