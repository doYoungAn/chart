import * as d3 from 'd3';
import { multiFormat } from './format';

interface IChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ILinechartData {
  date: Date;
  value: number;
}

interface ILinechartDataObj {
  color: string;
  datas: ILinechartData[]
}

export interface ILinechartConfig {
  element: HTMLElement;
  yRange: [number, number];
  xRange: [Date, Date];
  dataObjs: ILinechartDataObj[];
  margin?: IChartMargin;
  lineDot?: boolean;
}

const Margin: IChartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

const lineBaseStrokWidth: number    = 4;
const lineStrongStrokWidth: number  = 5;
const lineBaseOpacity: number       = 0.5;
const lineStrongOpacity: number     = 1;
const circleBaseR: number           = 6;
const circleStrongR: number         = 7;

const Linechart = (config: ILinechartConfig) => {

  const {
    element,
    yRange,
    xRange,
    dataObjs,
    margin = Margin,
    lineDot = true
  } = config;

  const width: number = element.clientWidth - margin.right - margin.left;
  const height: number = element.clientHeight - margin.top - margin.bottom;
  
  // 차트 부모 svg
  const svg = d3.select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const yScaleLeft = d3.scaleLinear()
    .domain(yRange)
    .range([height, 0]);

  svg.append('g')
    .attr('stroke-width', 2)
    .call(d3.axisLeft(yScaleLeft));

  const xScale = d3.scaleTime()
    .domain(xRange)
    .range([0, width])

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(multiFormat as any)

  svg.append('g')
    .attr('stroke-width', 2)
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  const line = d3.line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScaleLeft(d.value))
    .curve(d3.curveMonotoneX)

  const lineEls: d3.Selection<SVGPathElement, ILinechartData[], null, undefined>[] = [];

  dataObjs.forEach((dataObj) => {
    // 데이터로 그린 라인
    const lineEl = svg.append('path')
      .datum(dataObj.datas)
      .attr('stroke', dataObj.color)
      .attr('fill', 'none')
      .attr('stroke-width', lineBaseStrokWidth)
      .attr('d', (line as any))
    
    // 라인에 이벤트 걸기
    lineEl
      .on('mouseover', () => {
        lineEl.attr('stroke-width', lineStrongStrokWidth);
        lineEls.forEach((line) => line.attr('opacity', lineBaseOpacity));
        lineEl.attr('opacity', lineStrongOpacity);
        dotEl ? dotEl.attr('r', circleStrongR) : void 0;
      })
      .on('mouseleave', () => {
        lineEl.attr('stroke-width', lineBaseStrokWidth);
        lineEls.forEach((line) => line.attr('opacity', lineStrongOpacity));
        dotEl ? dotEl.attr('r', circleBaseR) : void 0;
      });
    
    lineEls.push(lineEl);
    
    // 라인에 점 그리기
    if (!lineDot) return;
    const dotEl = svg.selectAll('.dot')
      .data(dataObj.datas)
      .enter()
      .append('circle')
      .attr('cx', (d: ILinechartData) => xScale(d.date))
      .attr('cy', (d: ILinechartData) => yScaleLeft(d.value))
      .attr('fill', dataObj.color)
      .attr('r', circleBaseR)
    
    // 점에 이벤트 걸기
    dotEl
      .on('mouseover', () => {
        lineEl.attr('stroke-width', lineStrongStrokWidth);
        dotEl.attr('r', circleStrongR);
      })
      .on('mouseleave', () => {
        lineEl.attr('stroke-width', lineBaseStrokWidth);
        dotEl.attr('r', circleBaseR);
      });
  });
  
  return svg;

};

export default Linechart;
