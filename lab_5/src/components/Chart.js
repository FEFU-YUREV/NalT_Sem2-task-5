import * as d3 from "d3"
import { useState } from "react"
import ChartDraw from './ChartDraw'

const Chart = (props) => {
	 const [ox, setOx] = useState("Страна");
   const [oy, setOy] = useState([true, false]);
   const [chartType, setChartType] = useState("Точечная диаграмма");
   const [formOx, setFormOx] = useState("Страна");
   const [formOy, setFormOy] = useState([true, false]);
   const [formChartType, setFormChartType] = useState("Точечная диаграмма");
   const [isOyError, setIsOyError] = useState(false);

	 const handleSubmit = (event) => {
			event.preventDefault();

			if (!formOy.some(Boolean)) {
				setIsOyError(true);
				setOx(formOx);
				setOy(formOy);
				setChartType(formChartType);
				return;
			}

			setIsOyError(false);
			setOx(formOx);
			setOy(formOy);
         setChartType(formChartType);
	 }

	 const handleOxChange = (event) => {
			setFormOx(event.target.value);
	 }

	 const handleOyChange = (index) => {
			const nextFormOy = formOy.map((item, currentIndex) =>
				currentIndex === index ? !item : item
			);

			setFormOy(nextFormOy);

			if (nextFormOy.some(Boolean)) {
				setIsOyError(false);
			}
	 }

    const handleChartTypeChange = (event) => {
        setFormChartType(event.target.value);
    }

	 const createArrGraph = (data, key) => {
        const groupObj = d3.group(data, d => d[key]);
        const arrGraph = [];

        for (const entry of groupObj) {
            const minMax = d3.extent(entry[1].map(d => d["Высота"]));
            arrGraph.push({ labelX: entry[0], values: minMax });
        }

        if (key === "Год") {
            arrGraph.sort((a, b) => Number(a.labelX) - Number(b.labelX));
        }

        return arrGraph;
   }
   return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit}>
        <p>
          <label>Тип диаграммы </label>
          <select value={ formChartType } onChange={ handleChartTypeChange }>
            <option value="Точечная диаграмма">Точечная диаграмма</option>
            <option value="Гистограмма">Гистограмма</option>
          </select>
        </p>

        <p> Значение по оси OX: </p>
		<div>
          <input
            type="radio"
            name="ox"
            value="Страна"
            checked={ formOx === "Страна" }
            onChange={ handleOxChange }
          />
		  Страна
		  <br/>		
          <input
            type="radio"
            name="ox"
            value="Год"
            checked={ formOx === "Год" }
            onChange={ handleOxChange }
          />
		  Год
		</div>

        <p style={{ color: isOyError ? "red" : "black" }}> Значение по оси OY </p>
		<div>
          <input
            type="checkbox"
            name="oy"
            checked={ formOy[0] }
            onChange={ () => handleOyChange(0) }
          />
		  Максимальная высота <br/>
          <input
            type="checkbox"
            name="oy"
            checked={ formOy[1] }
            onChange={ () => handleOyChange(1) }
          />
		  Минимальная высота
		</div>

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>  
			<ChartDraw data={ createArrGraph(props.data, ox) } oy={ oy } chartType={ chartType } />
	</>
    )
}

export default Chart;
