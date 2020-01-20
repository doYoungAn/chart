import * as d3 from 'd3';
import Margin, { IChartMargin } from './common/margin';

interface IAreachartData {
    date: Date;
    value: number;
}

interface IAreachartDataObj { 
    name: string;
    color: string;
    datas: IAreachartData[];
}

export interface IAreachartConfig {
    element: HTMLElement;
    dataObjs: IAreachartDataObj[];
    yRange: [number, number];
    xRange: [Date, Date];
    margin?: IChartMargin;
    guide?: boolean;
}

const Areachart = (config: IAreachartConfig) => {

    const {
        element,
        dataObjs,
        yRange,
        xRange,
        margin = Margin,
        guide = true
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

    const y = d3.scaleLinear()
        .domain(yRange)
        .range([height, 0]);

    const x = d3.scaleTime()
        .domain(xRange)
        .range([0, width]);

    parentGEl
        .append('g')
        .attr('stroke-width', 2)
        .call(d3.axisLeft(y));

    parentGEl
        .append('g')
        .attr('stroke-width', 2)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    if (guide) {
        /// 가이드 라인
        const guidelineY = d3.axisLeft(y);
        const guideYGEl = parentGEl.append('g');
        guideYGEl
            .attr('stroke-opacity', 0.5)
            .call(guidelineY.tickSize(-width).tickFormat('' as any))
            .selectAll('line')
            .attr('stroke', '#BDBDBD')
        guideYGEl.selectAll('path').attr('stroke-width', 0);
        const guidelineX = d3.axisBottom(x);
        const guideXEl = parentGEl.append('g');
        guideXEl
            .attr('stroke-opacity', 0.5)
            .attr('transform', `translate(0, ${height})`)
            .call(guidelineX.tickSize(-height).tickFormat('' as any))
            .selectAll('line')
            .attr('stroke', '#BDBDBD');
        guideXEl.selectAll('path').attr('stroke-width', 0);
    }

    const dataEls:  d3.Selection<SVGPathElement, IAreachartData[], null, undefined>[] = [];

    dataObjs.forEach((dataObj) => {
        const dataEl = parentGEl
            .append('path')
            .datum(dataObj.datas)
            .attr('fill', dataObj.color)
            .attr("stroke", dataObj.color)
            .attr("stroke-width", 1.5)
            .attr('fill-opacity', 0.3)
            .attr('stroke-opacity', 1)
            .attr('d', d3.area().x((d: any) => x(d.date)).y0(y(0)).y1((d: any) => y(d.value)) as any);
        dataEl
            .on('mouseover', (d) => {
                dataEls.forEach(el => {
                    el.attr('fill-opacity', 0.3);
                    el.attr('stroke-opacity', 0.3);
                })
                dataEl.attr('fill-opacity', 1);
            })
            .on('mouseleave', (d) => {
                dataEls.forEach(el => {
                    el.attr('fill-opacity', 0.3);
                    el.attr('stroke-opacity', 1);
                })
            });
        dataEls.push(dataEl);
    })

}

export default Areachart;
