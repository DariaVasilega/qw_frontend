import logo from './logo.svg';
import './App.css';

function App() {
  const test = () => {
    fetch('https://backend.local/users', {method: 'GET', headers: {'Authorization': 'Bearer ca6599644dd6699e566f51cc53fa626a6277e3ac97fa97116b182331fd8d9e8'}})
        .then(response => response.json())
        .then(data => console.log(data))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          onClick={test}
          className="App-link"
          href="#"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
