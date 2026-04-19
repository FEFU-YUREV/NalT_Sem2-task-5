import { useState } from "react"
import Chart from './components/Chart.js'
import Table from './components/Table.js'
import './CSS/App.css'
import buildings from './data.js'

function App() {
  const [filteredBuildings, setFilteredBuildings] = useState(buildings);

  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Chart data={ filteredBuildings } />
       <Table
         data={ filteredBuildings }
         fullData={ buildings }
         amountRows="15"
         isPagination={true}
         onFilterChange={ setFilteredBuildings }
       />
    </div>
  );
}

export default App;
