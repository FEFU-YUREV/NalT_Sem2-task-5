import Table from './components/Table.js'
import './CSS/App.css'
import laptops from './data.js'

function App() {
  return (
    <div className="App">
       <h3>Список самых производительных ноутбуков</h3>
       <Table data={ laptops } amountRows="10" isPagination={true}/>
    </div>
  );
}

export default App;
