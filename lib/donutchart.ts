import * as d3 from 'd3';

export interface IDonutchartConfig {
  element: HTMLElement;
  data: number;
  tickSize?: number;
  dataColor?: string;
  leftColor?: string;
  textColor?: string;
  margin?: number;
  fontSize?: number | string;
}

const Donutchart = (config: IDonutchartConfig) => {

  const {
    element,
    data,
    tickSize = 20,
    dataColor = '#5EBBF8',
    textColor = '#ffffff',
    leftColor = '#F5F5F5',
    margin = 12,
    fontSize = 30
  } = config;

  const width: number = element.clientWidth;
  const height: number = element.clientHeight;
  const anglesRange = Math.PI * 0.5;
  const radis = Math.min(width, height) / 2 - margin;
  // const datas: [number, number] = [data, 100 - data];

  const pies = d3.pie()
    .value((d: any) => d)
    // .sort(null)
    // .startAngle(anglesRange * -1)
    // .endAngle(anglesRange);

  const colors = [dataColor, leftColor];

  const arc = d3
    .arc()
    .outerRadius(radis)
    .innerRadius(radis - tickSize)

  const svg = d3.select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const parentGEl = svg 
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height /2})`)

  const partEls = parentGEl
    .selectAll('back')
    .data(pies([100]))
    .enter()
    .append('path')
    .attr('fill', '#ffffff')
    .attr('d', (d) => {
      console.log('d', d);
      return arc(d as any)
    });

  parentGEl
    .selectAll('aaa')
    .data(pies([data, 100 - data]))
    .enter()
    .append('path')
    .attr('fill', (d, i) => colors[i])
    .transition()
    .duration(1000)
    .attrTween('d', (d) => {
      const i = d3.interpolate(d.startAngle + 0.1, d.endAngle)
      return (t) => {
        d.endAngle = i(t)
        return arc(d as any)
      }
    });

  parentGEl.append('text')
    .text(`${data}%`)
    .attr('y', 12)
    .attr('text-anchor', 'middle')
    .attr('fill', '#ffffff')
    .style('font-size', fontSize)

};

export default Donutchart;
