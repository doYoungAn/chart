import * as d3 from 'd3';
import Margin, { IChartMargin } from './common/margin';

interface IScatterplotData {
    x: number;
    y: number;
}

export interface IScatterplotConfig {
    element: HTMLElement;
    datas: IScatterplotData[],
    margin?: IChartMargin;
    plotColor?: string;
    plotSize?: number;
}

const Scatterplot = (config: IScatterplotConfig) => {

    const {
        element,
        datas,
        margin = Margin,
        plotColor = '#039BE5',
        plotSize = 2
    } = config;

    const width: number = element.clientWidth - margin.left - margin.right;
    const height: number = element.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const parentGEl = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    parentGEl.append('g')
        .attr('transform', `translate(0, ${height})`)
        .attr('stroke-width', 2)
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    parentGEl.append('g')
        .attr('stroke-width', 2)
        .call(d3.axisLeft(y))

    parentGEl.append('g')
        .selectAll('dot')
        .data(datas)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(d.x))
        .attr('cy', (d) => y(d.y))
        .attr('r', plotSize)
        .style('fill', plotColor)

};

export default Scatterplot;
