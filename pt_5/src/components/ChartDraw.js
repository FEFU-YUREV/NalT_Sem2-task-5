import * as d3 from "d3"
import { useEffect, useMemo, useRef, useState } from "react"

const ChartDraw = (props) => {
	const chartRef = useRef(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style("width")));
		setHeight(parseFloat(svg.style("height")));
    }, []);

	const margin = {
		top: 10,
		bottom: 60,
		left: 40,
		right: 10
	};

    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

	const series = useMemo(() => {
		const allSeries = [
			{ isActive: props.oy[0], valueIndex: 1, color: "red", key: "max", className: "chart-max" },
			{ isActive: props.oy[1], valueIndex: 0, color: "blue", key: "min", className: "chart-min" }
		];

		return allSeries.filter(item => item.isActive);
	}, [props.oy]);

	const values = useMemo(() => {
		return series.flatMap(item =>
			props.data.map(point => point.values[item.valueIndex])
		);
	}, [props.data, series]);

	const [minValue, maxValue] = values.length > 0 ? d3.extent(values) : [0, 0];

	const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .padding(0.2)
            .range([0, boundsWidth]);
    }, [props.data, boundsWidth]);

    const scaleBarX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(series.map(item => item.key))
            .range([0, scaleX.bandwidth()])
            .padding(0.15);
    }, [scaleX, series]);

    const scaleY = useMemo(() => {
		const lowerBound = minValue === maxValue ? minValue - 1 : minValue * 0.85;
		const upperBound = minValue === maxValue ? maxValue + 1 : maxValue * 1.1;

        return d3
            .scaleLinear()
            .domain([lowerBound, upperBound])
            .range([boundsHeight, 0]);
    }, [boundsHeight, minValue, maxValue]);

	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

		if (width === 0 || height === 0 || props.data.length === 0 || series.length === 0) {
			return;
		}

		svg
			.append("rect")
			.attr("x", margin.left)
			.attr("y", margin.top)
			.attr("width", boundsWidth)
			.attr("height", boundsHeight)
			.style("fill", "lightgrey");

        const xAxis = d3.axisBottom(scaleX);
        svg
			.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg
			.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

		series.forEach(item => {
            if (props.chartType === "Гистограмма") {
                svg
                    .selectAll(`.${item.className}`)
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("class", item.className)
                    .attr("x", d => scaleX(d.labelX) + scaleBarX(item.key))
                    .attr("y", d => scaleY(d.values[item.valueIndex]))
                    .attr("width", scaleBarX.bandwidth())
                    .attr("height", d => boundsHeight - scaleY(d.values[item.valueIndex]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", item.color)
                    .style("opacity", 0.75);
                return;
            }

			svg
				.selectAll(`.${item.className}`)
				.data(props.data)
				.enter()
				.append("circle")
				.attr("class", item.className)
				.attr("r", 5)
				.attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
				.attr("cy", d => scaleY(d.values[item.valueIndex]))
				.attr("transform", `translate(${margin.left}, ${margin.top})`)
				.style("fill", item.color);
		});

    }, [
		boundsHeight,
		boundsWidth,
		height,
		margin.bottom,
		margin.left,
		margin.top,
		props.chartType,
		props.data,
		scaleBarX,
		scaleX,
		scaleY,
		series,
		width
	]);

    return (
      <svg ref={chartRef}></svg>
	)
}

export default ChartDraw;
