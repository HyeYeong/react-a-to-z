import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <Hello name={"hy"}/>
        </Wrapper>
      </header>
    </div>
  );
}

export default App;
