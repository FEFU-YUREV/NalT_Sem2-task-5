import { useEffect, useState } from "react"
import Filter from './Filter.js'
import TableBody from './TableBody.js'
import TableHead from './TableHead.js'

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    const n = Math.ceil(props.data.length / props.amountRows);
    const [activePage, setActivePage] = useState("1");

    useEffect(() => {
        if (n === 0) {
            setActivePage("1");
            return;
        }

        if (Number(activePage) > n) {
            setActivePage("1");
        }
    }, [activePage, n]);

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
        <Filter filtering={ props.onFilterChange } data={ props.data } fullData={ props.fullData }/>
        <table>
            <TableHead head={ Object.keys(props.fullData[0]) } />
            <TableBody body={ props.data } amountRows={props.isPagination ?  props.amountRows : props.data.length} numPage={ activePage }/>
        </table>

        {props.isPagination ? <div>{pages}</div> : null}
	  </>   
    )   
}

export default Table;
