/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
		const handleReset = () => {
			props.filtering(props.fullData);
		};

		const handleSubmit= (event) => {        
        event.preventDefault();		
				const minYear = event.target["yearFrom"].value === ""
					? -Infinity
					: Number(event.target["yearFrom"].value);

				const maxYear = event.target["yearTo"].value === ""
					? Infinity
					: Number(event.target["yearTo"].value);

				const minHeight = event.target["heightFrom"].value === ""
					? -Infinity
					: Number(event.target["heightFrom"].value);

				const maxHeight = event.target["heightTo"].value === ""
					? Infinity
					: Number(event.target["heightTo"].value);


				// создаем словарь со значениями полей формы
				const textFilters = {
					"Название": event.target["structure"].value.toLowerCase(),
					"Тип": event.target["type"].value.toLowerCase(),
					"Страна": event.target["country"].value.toLowerCase(),
					"Город": event.target["town"].value.toLowerCase()
				};

				const numberFilters = {
					"Год": [minYear, maxYear],
					"Высота": [minHeight, maxHeight]
				};
					
				//фильтруем данные по значениям всех полей формы
				let arr = props.fullData;
				for(const key in  textFilters) {
						arr = arr.filter(item => 
						item[key].toLowerCase().includes(textFilters[key]));  
				} 
				for(const key in  numberFilters) {
						arr = arr.filter(item => 
						item[key] >= numberFilters[key][0] && item[key] <= numberFilters[key][1]);
				}  
										
				//передаем родительскому компоненту новое состояние - отфильтрованный массив
				props.filtering(arr);
			}
    return (
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label>Название:</label>
          <input name="structure" type="text" />
        </p>  
        <p>
          <label>Тип:</label>		
          <input name="type" type="text" />
        </p>
				<p>
          <label>Страна:</label>		
          <input name="country" type="text" />
        </p>
				<p>
          <label>Город:</label>		
          <input name="town" type="text" />
        </p>
				<p>
					<label>Год от:</label>
					<input name="yearFrom" type="number" />
				</p>
				<p>
					<label>Год до:</label>
					<input name="yearTo" type="number" />
				</p>

				<p>
					<label>Высота от:</label>
					<input name="heightFrom" type="number" />
				</p>
				<p>
					<label>Высота до:</label>
					<input name="heightTo" type="number" />
				</p>

        <p>         
          <button type="submit">Фильтровать</button>   
					<button type="reset">Очистить фильтр</button>
				</p>  
      </form> 
    )
}

export default Filter;