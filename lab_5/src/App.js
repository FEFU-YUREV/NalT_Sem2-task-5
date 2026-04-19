import Chart from './components/Chart.js'
import Table from './components/Table.js'
import './CSS/App.css'
import buildings from './data.js'

function App() {
  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Chart />
       <Table data={ buildings } amountRows="15" isPagination={true}/>
    </div>
  );
}

export default App;