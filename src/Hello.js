import React from "react";

function Hello(props){
  return <div>hello, {props.name}</div>
}
Hello.defaultProps = {
  name: 'anonymous'
}
export default Hello