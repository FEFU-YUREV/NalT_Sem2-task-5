import { useState } from "react"
import Filter from './Filter.js'
import TableBody from './TableBody.js'
import TableHead from './TableHead.js'

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    const [dataTable, setDataTable] = useState(props.data);
    const n = Math.ceil(dataTable.length / props.amountRows);
    const updateDataTable = (value) => {
        const n_new = Math.ceil(value.length / props.amountRows);
        setDataTable(value);
        setActivePage(String(n_new));
    };
	  //количество страниц разбиения таблицы
     
    const [activePage, setActivePage] = useState(String(n));
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };
    
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>  
          <span key={ index } onClick={ changeActive } className={ String(item) === activePage ? "page-number active" : "page-number"}>{item}</span>
    );

    return( 
      <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable } amountRows={props.isPagination ?  props.amountRows : props.data.length} numPage={ activePage }/>
        </table>

        {props.isPagination ? <div>{pages}</div> : null}
	  </>   
    )   
}

export default Table;
