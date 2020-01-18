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

        margin = Margin
    } = config;

    const width: number = element.clientWidth - margin.left - margin.right;
    const height: number = element.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const parentGEl = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

}

export default Treemap;