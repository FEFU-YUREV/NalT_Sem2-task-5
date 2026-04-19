import { useState } from "react"

const Chart = (props) => {
	 const [ox, setOx] = useState("Страна");
   const [oy, setOy] = useState([true, false])
	 const handleSubmit = (event) => {        
					event.preventDefault();
					setOx(event.target["ox"].value); 
			setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])		
	 }
   return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit}>
        <p> Значение по оси OX: </p>
		<div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ ox === "Страна" }/>
		  Страна
		  <br/>		
          <input type="radio" name="ox" value="Год" />
		  Год
		</div>

        <p> Значение по оси OY </p>
		<div>
          <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } />
		  Максимальная высота <br/>
          <input  type="checkbox" name="oy" />
		  Минимальная высота
		</div>

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>    
	</>
    )
}

export default Chart;