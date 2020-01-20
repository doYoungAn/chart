import * as d3 from 'd3';
import Margin, { IChartMargin } from './common/margin';

interface IHeatmapData {
    x: string;
    y: string;
    value: number;
}

export interface IHeatmapConfig {
    element: HTMLElement;
    xRange: string[];
    yRange: string[];
    valueRange: [number, number];
    datas: IHeatmapData[];
    margin?: IChartMargin;
    minColor?: string;
    maxColor?: string;
    xPadding?: number;
    yPadding?: number;
}

const Heatmap = (config: IHeatmapConfig) => {

    const {
        element,
        xRange,
        yRange,
        valueRange,
        datas,
        margin = Margin,
        minColor = '#ffffff',
        maxColor = '#00ACC1',
        xPadding = 0.1,
        yPadding = 0.1
    } = config;

    const width: number = element.clientWidth - margin.left - margin.right;
    const height: number = element.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const parentGEl = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .domain(xRange)
        .range([0, width])
        .padding(xPadding);

    parentGEl.append('g')
        .attr('stroke-width', 2)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    const y = d3.scaleBand()
        .domain(yRange)
        .range([height, 0])
        .padding(yPadding);

    parentGEl.append('g')
        .attr('stroke-width', 2)
        .call(d3.axisLeft(y));

    const colors = d3.scaleLinear()
        .range([minColor, maxColor] as any)
        .domain(valueRange)

    const dataEls = parentGEl
        .selectAll()
        .data(datas)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.x))
        .attr('y', (d) => y(d.y))
        
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', minColor)

    dataEls
        .transition()
        .duration(1000)
        .style('fill', (d) => colors(d.value))

}

export default Heatmap;
