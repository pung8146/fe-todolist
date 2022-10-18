import './App.css';
import Header from './component/Header';
import Todo from './component/Todo';
// import TodoList from './component/TodoList';
// import {BrowserRouter , Route , Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Header />
      {/* <TodoList /> */}
      <Todo />
    </div>
  );
}

export default App;
