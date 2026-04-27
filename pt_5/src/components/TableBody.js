import TableRow from './TableRow.js'

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
      numPage - номер текущей страницы
      amountRows - количество строк таблицы на странице
*/

const TableBody = (props) => {
    const begRange = (props.numPage - 1) * props.amountRows;
    const endRange = begRange + Number(props.amountRows);

    if (props.body.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={ props.columnsNumber } className="empty-data">
                        По заданным параметрам ничего не найдено
                    </td>
                </tr>
            </tbody>
        )
    }

    const tbody = props.body.map((item, index) =>
        <tr key={ index } className={
           (index >= begRange && index < endRange) ? "show" : "hide"
        }>
            <TableRow row={ Object.values(item) } isHead="0"/>
        </tr>
    );

    return (
        <tbody>
            {tbody}
        </tbody>
    )
}

export default TableBody;
