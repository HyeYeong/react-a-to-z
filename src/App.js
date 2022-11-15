import React, { useRef, useState, useMemo, useReducer, useCallback } from "react";
import Hello from './Hello';
import Count from './Count';
import Wrapper from './Wrapper';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length
}

const initialState = {
  inputs: {
    username:'',
    email:''
  },
  users : [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]
}

function reducer(state, action) {
  switch(action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      }
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    case 'TOGGLE_USER': 
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      }
    default: 
      return state
  }
}

function App() {
  

  const [state, dispatch] = useReducer(reducer, initialState)

  const { users } = state
  const { username, email } = state.inputs;
  const nextId = useRef(4);
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, []);
  
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      users: {
        id: nextId.current,
        username,
        email
      }
    })
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    dispatch({
      type: 'DELETE_USER',
      id
    })
  }, []);
  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    })
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users])
  // Memo 는 "memoized" 를 의미하는데, 이는 이전에 계산 한 값을 재사용한다는 의미를 가지고 있다.

  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <Hello name={"hy"}/>
          <Count/>
          <InputSample/>
          <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
          <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
          />
          <div>활성 사용자 수: {count}</div>
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
