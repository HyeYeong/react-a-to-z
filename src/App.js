import Hello from './Hello';
import Count from './Count';
import Wrapper from './Wrapper';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <Hello name={"hy"}/>
          <Count/>
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
