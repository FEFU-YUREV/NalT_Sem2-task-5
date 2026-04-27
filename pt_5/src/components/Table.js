import { useState } from "react"
import Chart from './Chart.js'
import Filter from './Filter.js'
import Sort from './Sort.js'
import TableBody from './TableBody.js'
import TableHead from './TableHead.js'

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    const amountRows = Number(props.amountRows);
    const [filteredData, setFilteredData] = useState(props.data);
    const [dataTable, setDataTable] = useState(props.data);
    const [sortData, setSortData] = useState([]);
    const [activePage, setActivePage] = useState("1");

    const getFieldValue = (value) => {
        if (typeof value === "number") {
            return value;
        }

        const cleanValue = String(value).replace("$", "").replace(",", "");

        return Number.isNaN(Number(cleanValue))
            ? String(value).toLowerCase()
            : Number(cleanValue);
    };

    const getSortTable = (data, sortArr) => {
        if (sortArr.length === 0) {
            return [...data];
        }

        return [...data].sort((a, b) => {
            for (const item of sortArr) {
                const firstValue = getFieldValue(a[item.field]);
                const secondValue = getFieldValue(b[item.field]);

                if (firstValue < secondValue) {
                    return item.isDesc ? 1 : -1;
                }

                if (firstValue > secondValue) {
                    return item.isDesc ? -1 : 1;
                }
            }

            return 0;
        });
    };

    const updateDataTable = (value) => {
        setFilteredData(value);
        setDataTable(getSortTable(value, sortData));
        setActivePage("1");
    };

    const updateSortTable = (value) => {
        setSortData(value);
        setDataTable(getSortTable(filteredData, value));
        setActivePage("1");
    };

    const n = Math.ceil(dataTable.length / amountRows);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const pages = arr.map((item, index) =>
          <span key={ index } onClick={ changeActive } className={ String(item) === activePage ? "page-number active" : "page-number"}>{item}</span>
    );

    return(
      <>
        <div className="controls">
            <details className="control-section" open>
                <summary>Фильтр</summary>
                <Filter filtering={ updateDataTable } fullData={ props.data } />
            </details>
            <details className="control-section">
                <summary>Сортировка</summary>
                <Sort sorting={ updateSortTable } fields={ Object.keys(props.data[0]) } />
            </details>
            <details className="control-section">
                <summary>Диаграмма</summary>
                <Chart data={ filteredData } />
            </details>
        </div>
        <div className="table-wrapper">
            <table>
                <TableHead head={ Object.keys(props.data[0]) } />
                <TableBody
                    body={ dataTable }
                    amountRows={ props.isPagination ? amountRows : props.data.length }
                    numPage={ activePage }
                    columnsNumber={ Object.keys(props.data[0]).length }
                />
            </table>
        </div>

        {props.isPagination && n > 1 ? <div className="pages">{ pages }</div> : null}
      </>
    )
}

export default Table;
