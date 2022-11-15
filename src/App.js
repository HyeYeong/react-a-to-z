import React, {useRef, useState} from "react";
import Hello from './Hello';
import Count from './Count';
import Wrapper from './Wrapper';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from "./CreateUser";

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
  const onChange =(e) => {
    const {name, value} = e.target
    setInputs({
      ...inputs,
      [name]: value
    })

  }
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    }
    setUsers([...users, user])
    setInputs({
      username: '',
      email: ''
    })
    nextId.current += 1
  }

  const onRemove = (id) => setUsers(users.filter(user => user.id !== id))
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <Hello name={"hy"}/>
          <Count/>
          <InputSample/>
          <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
          <CreateUser onChange={onChange} onCreate={onCreate} username={username} email={email}/>
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
