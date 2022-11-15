import React, { Component } from "react";

// 클래스형 컴포넌트로 변경
class Hello extends Component {
  static defaultProps = {
    name: 'anonymous'
  }
  // 함수형 컴포넌트에서 사용했던 Hello.defaultProps 도 가능하며, static도 가능함. 
  
  render() {
    // render가 필요함
    const {color, name, isSpecial} = this.props
    // props를 조회할 때에는 this가 필요함.
    return (
      <div style={isSpecial && {background: color}}>
        hello, {name}
        {isSpecial && <b>*</b>}
      </div>
    )
  }
}

export default Hello