import React, { useMemo, useState, useReducer, useCallback } from "react";
import Hello from './Hello';
import Count from './Count';
import Wrapper from './Wrapper';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from "./CreateUser";
import produce from 'immer';
// 상태를 업데이트 할 때, 불변성을 신경쓰지 않으면서 업데이트를 해 주면 immer가 불변성 관리를 대신 해줌 
// produce 함수를 사용 할 때에는 첫번째 파라미터에는 수정하고 싶은 상태, 두번째 파라미터에는 어떻게 업데이트하고 싶을지 정의하는 함수를 넣어줍니다.

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

export const UserDispatch = React.createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { users } = state
  const { username, email } = state.inputs;

  const stateEx = {
    number: 1,
    dontChangeMe: 2
  }

  const nextState = produce(stateEx, draft => {
    draft.number += 10
  })
  // 함수형 업데이트를 하는 경우에 Immer를 사용하면 상황에 따라 더 편하게 코드 작성이 가능. 
  console.log(nextState)

  const doneTodo = useCallback(() => {
    setTodo(produce(draft => {
      draft.done = !draft.done
    }))
  }, [])

  const [todo, setTodo] = useState({
    text: 'make todo list',
    done: false
  })

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
        </Wrapper>
        {todo.text}{todo.done && " - done!"}
        <button onClick={doneTodo}>DONE</button>
        <UserDispatch.Provider value={dispatch}>
          <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
          <CreateUser
            username={username}
            email={email}
          />
          <div>활성 사용자 수: {count}</div>
        </UserDispatch.Provider>
      </header>
    </div>
  );
}

export default App;
