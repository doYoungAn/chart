import * as d3 from 'd3';

interface IChartMargin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface ITreemapConfig {
    element: HTMLElement;

    margin?: IChartMargin;
    strokeColor?: string;
    fillColor?: string;
    nameColor?: string;
}

const Margin: IChartMargin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

const Treemap = (config: ITreemapConfig) => {

    const {
        element,

        margin = Margin,
        strokeColor = '#000000',
        fillColor = '#BDBDBD',
        nameColor = '#ffffff'
    } = config;

    const width: number = element.clientWidth - margin.left - margin.right;
    const height: number = element.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const parentGEl = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const datas = [
        {name: 'origin', parent: '', value: 0},
        {name: '1', parent: 'origin', value: 12},
        {name: '2', parent: 'origin', value: 23},
        {name: '3', parent: 'origin', value: 11},
        {name: '4', parent: 'origin', value: 40},
        {name: '5', parent: 'origin', value: 30},
        {name: '6', parent: 'origin', value: 25},
        {name: '7', parent: 'origin', value: 25},
    ];

    const root = d3.stratify()
        .id((d: any) => d.name)
        .parentId((d: any) => d.parent)
        (datas)
    root.sum((d: any) => +d.value)

    d3.treemap()
        .size([width, height])
        .padding(4)
        (root);

    parentGEl
        .selectAll('rect')
        .data(root.leaves())
        .enter()
        .append('rect')
        .attr('x', function (d: any) { return d.x0; })
        .attr('y', function (d: any) { return d.y0; })
        .attr('width', function (d: any) { return d.x1 - d.x0; })
        .attr('height', function (d: any) { return d.y1 - d.y0; })
        .attr('stroke-width', 2)
        .style('stroke', strokeColor)
        .style('fill', fillColor);

    parentGEl
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append('text')
        .attr('x', function(d: any){ return d.x0+10})    // +10 to adjust position (more right)
        .attr('y', function(d: any){ return d.y0+20})    // +20 to adjust position (lower)
        .text(function(d: any){ return d.data.name})
        .attr('font-size', '15px')
        .attr('fill', nameColor)

}

export default Treemap;