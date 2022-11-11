import Hello from './Hello';
import Count from './Count';
import Wrapper from './Wrapper';
import InputSample from './InputSample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <Hello name={"hy"}/>
          <Count/>
          <InputSample/>
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
