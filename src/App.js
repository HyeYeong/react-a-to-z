import React, { useRef, useState, useMemo } from "react";
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
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const onCreate = () => {
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
  };
  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

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
