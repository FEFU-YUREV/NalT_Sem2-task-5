import { useRef, useState } from "react"

function RatingAverage() {
  const inputRef = useRef(null);
  const previousValueRef = useRef(null);
  const [average, setAverage] = useState("");

  const handleSubmit = () => {
    const currentValue = Number(inputRef.current.value);

    if (previousValueRef.current === null) {
      setAverage(currentValue);
    } else {
      setAverage((previousValueRef.current + currentValue) / 2);
    }

    previousValueRef.current = currentValue;
    inputRef.current.value = "";
  };

  return (
    <section>
      <div>
        <label htmlFor="rating-input">Введите число:</label>
        <input
          ref={inputRef}
          id="rating-input"
          type="number"
          step="any"
          defaultValue="5"
        />
        <button type="button" onClick={handleSubmit}>
          Отправить
        </button>
      </div>

      <p>Среднее значение: {average}</p>
    </section>
  );
}

export default RatingAverage;
