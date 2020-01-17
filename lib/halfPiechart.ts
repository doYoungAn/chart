import * as d3 from 'd3';

export interface IHalfPiechartConfig {
  element: HTMLElement;
  data: number;
  tickSize?: number;
  dataColor?: string;
  leftColor?: string;
  textColor?: string;
  margin?: number;
  fontSize?: number | string;
}

const HalfPiechart = (config: IHalfPiechartConfig) => {

  const {
    element,
    data,
    tickSize = 70,
    dataColor = '#5EBBF8',
    textColor = '#ffffff',
    leftColor = '#F5F5F5',
    margin = 0,
    fontSize = 30
  } = config;

  const width: number = element.clientWidth;
  const height: number = element.clientHeight;
  const anglesRange = Math.PI * 0.5;
  const radis = Math.min(width, height) / 2 - margin;
  const datas: [number, number] = [data, 100 - data];

  const pies = d3.pie()
    .value((d: any) => d)
    .sort(null)
    .startAngle(anglesRange * -1)
    .endAngle(anglesRange);

  const colors = [dataColor, leftColor];

  const arc = d3
    .arc()
    .outerRadius(0)
    .innerRadius(radis)

  const svg = d3.select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const parentGEl = svg 
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height})`)

  const partEls = parentGEl
    .selectAll('path')
    .data(pies(datas))
    .enter()
    .append('path')
    .attr('fill', (d, i) => colors[i])
    .attr('opacity', 0.8)
    .attr('d', (d) => arc(d as any));

  parentGEl.append('text')
    .text(`${data}%`)
    .attr('dy', '-1rem')
    .attr('text-anchor', 'middle')
    .attr('fill', textColor)
    .style('font-size', fontSize)

};

export default HalfPiechart;
