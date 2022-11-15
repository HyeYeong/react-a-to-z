import React, { useRef, useState, useMemo, useCallback } from "react";
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

function App() {
  const usersArr = [
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
  ];
  const [inputs, setInputs] = useState({
    username:'',
    email:''
  })
  const { username, email } = inputs;
  const [users, setUsers] = useState(usersArr)

  const nextId = useRef(4);
  // useCallback 은 리랜더링 될 때 매번 함수가 생성되는 것을 방지. 필요할 때만 함수가 생성될 수 있게 해 준다. 
  // 주의 하실 점은, 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 된다는 것 입니다. 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다. props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 해요.
  // 사실, useCallback 은 useMemo 를 기반으로 만들어졌습니다. 다만, 함수를 위해서 사용 할 때 더욱 편하게 해준 것 뿐이지요. 이런식으로도 표현 할 수 있습니다.
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);
  
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [users, username, email]);
  const onRemove = useCallback(id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  }, [users]);
  const onToggle = useCallback(id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, [users]);

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
