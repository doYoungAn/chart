import * as d3 from 'd3';
import { multiFormat } from './format';

interface IChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface ITimelineDataObj {
  name: string;
  start: Date;
  end: Date;
}

export interface ITimelineConfig {
  element: HTMLElement;
  xRange: [Date, Date];
  dataObjs: ITimelineDataObj[];
  nameWidth?: number;
  nameColor?: string;
  gridColor?: string;
  timeColor?: string;
  barHeight?: number;
  barGap?: number;
  margin?: IChartMargin;
}

const Margin: IChartMargin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};

const Timeline = (config: ITimelineConfig) => {
  const {
    element,
    xRange,
    dataObjs,
    nameWidth = 80,
    nameColor = '#000000',
    gridColor = '#BDBDBD',
    timeColor = '#000000',
    barHeight = 32,
    barGap = 4,
    margin = Margin
  } = config;

  const width: number = element.clientWidth - margin.right - margin.left;
  const height: number = element.clientHeight - margin.top - margin.bottom;
  const rowHeight: number = barHeight + (2 * barGap);
  const uniqueNames: string[] = dataObjs.map(obj => obj.name)
    .reduce((prev, next) => {
      prev.indexOf(next) < 0 ? prev.push(next) : void 0
      return prev;
    }, []);
  const colorScale = d3.scaleOrdinal()
    .domain(uniqueNames)
    .range(d3.schemeSet3)

  // 최상단 부모
  const svg = d3.select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  // 최상단 G
  const parentG = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .selectAll('rect')
    .data(uniqueNames)
    .enter()
    .append('rect')
    .attr('y', (d: string, i: number) => i * rowHeight)
    .attr('height', rowHeight)
    .attr('width', width)
    .attr('opacity', 0.3)
    .attr('fill', (d: string) => colorScale(d) as string)
  // 타이틀 G
  const textG = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .selectAll('text')
    .data(uniqueNames)
    .enter()
    .append('text')
    .text((d: string) => d)
    .attr('x', 5)
    .attr('y', (d: string, i: number) => i * rowHeight + rowHeight / 2 + 5)
    .attr('height', rowHeight)
    .attr('width', width)
    .attr('fill', nameColor)

  const xScale = d3.scaleTime()
    .domain(xRange)
    .range([0, width - nameWidth])

  const xAxis = d3.axisBottom(xScale)
    .tickSize(rowHeight * uniqueNames.length)
    .tickFormat(multiFormat as any);

  const timeScale = d3.scaleTime()
    .domain(xRange)
    .range([0, width - nameWidth])

  // 타임라인 보여준다
  const timelineG = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .selectAll('rect')
    .data(dataObjs)
    .enter()
    .append('rect')
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('x', (d: ITimelineDataObj) => {
      const startPosition: number = timeScale(d.start);
      return nameWidth + startPosition;
    })
    .attr('y', (d: ITimelineDataObj) => {
      return uniqueNames.indexOf(d.name) * rowHeight + barGap;
    })
    .attr('width', (d: ITimelineDataObj) => {
      const startPosition: number = timeScale(d.start);
      const endPosition: number = timeScale(d.end);
      return endPosition - startPosition;
    })
    .attr('height', barHeight)
    .attr('fill', (d: ITimelineDataObj) => colorScale(d.name) as string)


    // x 그리드
  const xGrid = svg.append('g')
    .attr('transform', `translate(${nameWidth + margin.left}, ${margin.top})`)
    .attr('height', height)
  xGrid.call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'middle')
    .attr('stroke', 'none')
    .attr('font-size', 10)
    .attr('dy', '1em')
    .attr('stroke', timeColor)
  xGrid.select('path')
    .attr('stroke-width', 0)
  xGrid.selectAll('line')
    .attr('stroke', gridColor);
  
};

export default Timeline;
