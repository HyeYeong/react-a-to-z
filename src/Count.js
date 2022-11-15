import React, { useReducer} from "react";

// userReducer :
// reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수입니다.
// reducer 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 됩니다.
// 여기서 action 은 업데이트를 위한 정보를 가지고 있습니다. 주로 type 값을 지닌 객체 형태로 사용하지만, 꼭 따라야 할 규칙은 따로 없습니다. 
// const [state, dispatch] = useReducer(reducer, initialState);

// 여기서 state 는 우리가 앞으로 컴포넌트에서 사용 할 수 있는 상태를 가르키게 되고, dispatch 는 액션을 발생시키는 함수라고 이해하시면 됩니다. 이 함수는 다음과 같이 사용합니다: dispatch({ type: 'INCREMENT' }).
// 그리고 useReducer 에 넣는 첫번째 파라미터는 reducer 함수이고, 두번째 파라미터는 초기 상태입니다.

// function reducer(state, action) {
//   // 새로운 상태를 만드는 로직
//   const nextState = ''
//   return nextState;
// }


function reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state + 1;
    default:
      return state;
  }
}

function Count(){
  const [count, dispatch] = useReducer(reducer, 0)
  const onIncrease = () => dispatch({type: 'INCREMENT'})
  const onDecrease = () => dispatch({type: 'DECREMENT'})
  return (
    <div>
      <p>{count}</p>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}
export default Count