import { useState } from "react"

const Sort = (props) => {
    const emptyLevels = [
        { field: "", isDesc: false },
        { field: "", isDesc: false },
        { field: "", isDesc: false }
    ];

    const [sortLevels, setSortLevels] = useState([
        { field: "", isDesc: false },
        { field: "", isDesc: false },
        { field: "", isDesc: false }
    ]);

    const updateLevel = (index, key, value) => {
        setSortLevels(currentLevels => {
            const nextLevels = currentLevels.map((item, itemIndex) =>
                itemIndex === index
                    ? { ...item, [key]: value }
                    : item
            );

            if (key === "field" && value === "") {
                for (let i = index; i < nextLevels.length; i++) {
                    nextLevels[i] = { field: "", isDesc: false };
                }
            }

            return nextLevels;
        });
    };

    const getOptions = (index) => {
        const selectedFields = sortLevels
            .filter((item, itemIndex) => itemIndex !== index && item.field !== "")
            .map(item => item.field);

        return props.fields.filter(field =>
            field === sortLevels[index].field || !selectedFields.includes(field)
        );
    };

    const handleReset = () => {
        setSortLevels(emptyLevels);
        props.sorting([]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const levels = sortLevels.filter(item => item.field !== "");

        props.sorting(levels);
    };

    return (
        <form onSubmit={ handleSubmit } onReset={ handleReset } className="control-form">
            <p className="sort-line">
                <label>Первый уровень:</label>
                <select
                    name="field1"
                    value={ sortLevels[0].field }
                    onChange={ (event) => updateLevel(0, "field", event.target.value) }
                >
                    <option value="">Нет</option>
                    { getOptions(0).map((item, index) =>
                        <option key={ index } value={ item }>{ item }</option>
                    ) }
                </select>
                <label>По убыванию?</label>
                <input
                    name="desc1"
                    type="checkbox"
                    checked={ sortLevels[0].isDesc }
                    onChange={ (event) => updateLevel(0, "isDesc", event.target.checked) }
                    disabled={ sortLevels[0].field === "" }
                />
            </p>
            <p className="sort-line">
                <label>Второй уровень:</label>
                <select
                    name="field2"
                    value={ sortLevels[1].field }
                    onChange={ (event) => updateLevel(1, "field", event.target.value) }
                    disabled={ sortLevels[0].field === "" }
                >
                    <option value="">Нет</option>
                    { getOptions(1).map((item, index) =>
                        <option key={ index } value={ item }>{ item }</option>
                    ) }
                </select>
                <label>По убыванию?</label>
                <input
                    name="desc2"
                    type="checkbox"
                    checked={ sortLevels[1].isDesc }
                    onChange={ (event) => updateLevel(1, "isDesc", event.target.checked) }
                    disabled={ sortLevels[1].field === "" || sortLevels[0].field === "" }
                />
            </p>
            <p className="sort-line">
                <label>Третий уровень:</label>
                <select
                    name="field3"
                    value={ sortLevels[2].field }
                    onChange={ (event) => updateLevel(2, "field", event.target.value) }
                    disabled={ sortLevels[1].field === "" }
                >
                    <option value="">Нет</option>
                    { getOptions(2).map((item, index) =>
                        <option key={ index } value={ item }>{ item }</option>
                    ) }
                </select>
                <label>По убыванию?</label>
                <input
                    name="desc3"
                    type="checkbox"
                    checked={ sortLevels[2].isDesc }
                    onChange={ (event) => updateLevel(2, "isDesc", event.target.checked) }
                    disabled={ sortLevels[2].field === "" || sortLevels[1].field === "" }
                />
            </p>
            <p className="form-buttons">
                <button type="submit">Сортировать</button>
                <button type="reset">Сбросить сортировку</button>
            </p>
        </form>
    )
}

export default Sort;
