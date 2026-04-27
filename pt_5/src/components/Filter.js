/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
    const getNumberValue = (value) => {
        if (typeof value === "number") {
            return value;
        }

        return Number(String(value).replace("$", "").replace(",", ""));
    };

    const getBorderValue = (value, borderType) => {
        if (value === "") {
            return borderType === "min" ? -Infinity : Infinity;
        }

        return Number(value);
    };

    const handleReset = () => {
        props.filtering(props.fullData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const textFilters = {
            "Бренд": event.target["brand"].value.toLowerCase(),
            "Модель": event.target["model"].value.toLowerCase(),
            "CPU модель": event.target["cpu"].value.toLowerCase(),
            "GPU": event.target["gpu"].value.toLowerCase(),
            "Экран (дюймы/разрешение/Гц)": event.target["screen"].value.toLowerCase()
        };

        const numberFilters = {
            "Ядра": [
                getBorderValue(event.target["coresFrom"].value, "min"),
                getBorderValue(event.target["coresTo"].value, "max")
            ],
            "Потоки": [
                getBorderValue(event.target["threadsFrom"].value, "min"),
                getBorderValue(event.target["threadsTo"].value, "max")
            ],
            "Буст (ГГц)": [
                getBorderValue(event.target["boostFrom"].value, "min"),
                getBorderValue(event.target["boostTo"].value, "max")
            ],
            "RAM (ГБ)": [
                getBorderValue(event.target["ramFrom"].value, "min"),
                getBorderValue(event.target["ramTo"].value, "max")
            ],
            "Хранилище (ГБ)": [
                getBorderValue(event.target["storageFrom"].value, "min"),
                getBorderValue(event.target["storageTo"].value, "max")
            ],
            "Вес (кг)": [
                getBorderValue(event.target["weightFrom"].value, "min"),
                getBorderValue(event.target["weightTo"].value, "max")
            ],
            "Батарея (Вт⋅ч)": [
                getBorderValue(event.target["batteryFrom"].value, "min"),
                getBorderValue(event.target["batteryTo"].value, "max")
            ],
            "Цена": [
                getBorderValue(event.target["priceFrom"].value, "min"),
                getBorderValue(event.target["priceTo"].value, "max")
            ],
            "Балл производительности": [
                getBorderValue(event.target["scoreFrom"].value, "min"),
                getBorderValue(event.target["scoreTo"].value, "max")
            ],
            "Год": [
                getBorderValue(event.target["yearFrom"].value, "min"),
                getBorderValue(event.target["yearTo"].value, "max")
            ]
        };

        let arr = props.fullData;

        for (const key in textFilters) {
            arr = arr.filter(item =>
                String(item[key]).toLowerCase().includes(textFilters[key]));
        }

        for (const key in numberFilters) {
            arr = arr.filter(item =>
                getNumberValue(item[key]) >= numberFilters[key][0] &&
                getNumberValue(item[key]) <= numberFilters[key][1]);
        }

        props.filtering(arr);
    }

    return (
      <form onSubmit={ handleSubmit } onReset={ handleReset } className="control-form">
        <p>
          <label>Бренд:</label>
          <input name="brand" type="text" />
        </p>
        <p>
          <label>Модель:</label>
          <input name="model" type="text" />
        </p>
        <p>
          <label>CPU модель:</label>
          <input name="cpu" type="text" />
        </p>
        <p>
          <label>GPU:</label>
          <input name="gpu" type="text" />
        </p>
        <p>
          <label>Экран:</label>
          <input name="screen" type="text" />
        </p>
        <p className="range-line">
          <label>Ядра:</label>
          <span>от</span>
          <input name="coresFrom" type="number" />
          <span>до</span>
          <input name="coresTo" type="number" />
        </p>
        <p className="range-line">
          <label>Потоки:</label>
          <span>от</span>
          <input name="threadsFrom" type="number" />
          <span>до</span>
          <input name="threadsTo" type="number" />
        </p>
        <p className="range-line">
          <label>Буст (ГГц):</label>
          <span>от</span>
          <input name="boostFrom" type="number" step="any" />
          <span>до</span>
          <input name="boostTo" type="number" step="any" />
        </p>
        <p className="range-line">
          <label>RAM (ГБ):</label>
          <span>от</span>
          <input name="ramFrom" type="number" />
          <span>до</span>
          <input name="ramTo" type="number" />
        </p>
        <p className="range-line">
          <label>Хранилище (ГБ):</label>
          <span>от</span>
          <input name="storageFrom" type="number" />
          <span>до</span>
          <input name="storageTo" type="number" />
        </p>
        <p className="range-line">
          <label>Вес (кг):</label>
          <span>от</span>
          <input name="weightFrom" type="number" step="any" />
          <span>до</span>
          <input name="weightTo" type="number" step="any" />
        </p>
        <p className="range-line">
          <label>Батарея (Вт⋅ч):</label>
          <span>от</span>
          <input name="batteryFrom" type="number" step="any" />
          <span>до</span>
          <input name="batteryTo" type="number" step="any" />
        </p>
        <p className="range-line">
          <label>Цена:</label>
          <span>от</span>
          <input name="priceFrom" type="number" />
          <span>до</span>
          <input name="priceTo" type="number" />
        </p>
        <p className="range-line">
          <label>Балл:</label>
          <span>от</span>
          <input name="scoreFrom" type="number" />
          <span>до</span>
          <input name="scoreTo" type="number" />
        </p>
        <p className="range-line">
          <label>Год:</label>
          <span>от</span>
          <input name="yearFrom" type="number" />
          <span>до</span>
          <input name="yearTo" type="number" />
        </p>
        <p className="form-buttons">
          <button type="submit">Фильтровать</button>
          <button type="reset">Очистить фильтр</button>
        </p>
      </form>
    )
}

export default Filter;
