import Form from './Form';

import logo from './logo.png';

import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img className="logo" src={logo} alt="Logo" />
                <Form />
            </header>
        </div>
    );
}

export default App;
