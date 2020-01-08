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
  guideline?: boolean;
}

const Margin: IChartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

const lineBaseStrokWidth: number    = 5;
const lineStrongStrokWidth: number  = 6;
const circleBaseR: number           = 7;
const circleStrongR: number         = 8;
const baseOpacity: number           = 0.5;
const strongOpacity: number         = 1;

const Linechart = (config: ILinechartConfig) => {

  const {
    element,
    yRange,
    xRange,
    dataObjs,
    margin = Margin,
    lineDot = true,
    guideline = true
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

  // 가이드 라인 그리기
  if (guideline) {
    const guidelineX = d3.axisBottom(xScale);
    const guidelineY = d3.axisLeft(yScaleLeft);
    svg
      .append('g')
      .attr('stroke-opacity', 0.5)
      .attr('transform', `translate(0, ${height})`)
      .call(guidelineX.tickSize(-height).tickFormat('' as any))
      .selectAll('line')
      .attr('stroke', '#BDBDBD');
    svg
      .append('g')
      .attr('stroke-opacity', 0.5)
      .call(guidelineY.tickSize(-width).tickFormat('' as any))
      .selectAll('line')
      .attr('stroke', '#BDBDBD')
  }

  const line = d3.line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScaleLeft(d.value))
    .curve(d3.curveMonotoneX)

  const lineEls: d3.Selection<SVGPathElement, ILinechartData[], null, undefined>[] = [];
  const dotEls: d3.Selection<SVGCircleElement, ILinechartData, SVGElement, unknown>[] = [];

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
        lineEls.forEach((line) => line.attr('opacity', baseOpacity));
        lineEl.attr('opacity', strongOpacity);
        dotEl ? dotEl.attr('r', circleStrongR) : void 0;
        dotEls.forEach((dot) => dot.attr('opacity', baseOpacity));
        dotEl ? dotEl.attr('opacity', strongOpacity) : void 0;
      })
      .on('mouseleave', () => {
        lineEl.attr('stroke-width', lineBaseStrokWidth);
        lineEls.forEach((line) => line.attr('opacity', strongOpacity));
        dotEl ? dotEl.attr('r', circleBaseR) : void 0;
        dotEls.forEach((dot) => dot.attr('opacity', strongOpacity));
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
        lineEls.forEach((line) => line.attr('opacity', baseOpacity))
        lineEl.attr('stroke-width', lineStrongStrokWidth);
        lineEl.attr('opacity', strongOpacity);
        dotEls.forEach((dot) => dot.attr('opacity', baseOpacity));
        dotEl.attr('r', circleStrongR);
        dotEl.attr('opacity', strongOpacity);
      })
      .on('mouseleave', () => {
        lineEl.attr('stroke-width', lineBaseStrokWidth);
        lineEls.forEach((line) => line.attr('opacity', strongOpacity));
        dotEl.attr('r', circleBaseR);
        dotEls.forEach((dot) => dot.attr('opacity', strongOpacity));
      });

    dotEls.push(dotEl);
  });
  
  return svg;

};

export default Linechart;
