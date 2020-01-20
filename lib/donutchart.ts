import * as d3 from 'd3';

interface IDonutchartData {
  name: string;
  value: number;
  color: string;
}

export interface IDonutchartConfig {
  element: HTMLElement;
  datas: IDonutchartData[];
  tickSize?: number
  margin?: number;
  duration?: number;
}

const Donutchart = (config: IDonutchartConfig) => {

  const {
    element,
    datas,
    tickSize = 40,
    margin = 40,
    duration = 1000,
  } = config;

  const width: number = element.clientWidth;
  const height: number = element.clientHeight;
  const radis: number = Math.min(width, height) / 2 - margin;

  const pies: d3.Pie<any, any> = d3
    .pie()
    .value((d: any) => d.value)

  const dataReady = pies(datas);

  const arc: d3.Arc<any, d3.DefaultArcObject> = d3
    .arc()
    .outerRadius(radis)
    .innerRadius(radis - tickSize);

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const parentGEl = svg 
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height /2})`);

  parentGEl
    .selectAll('origin')
    .data(dataReady)
    .enter()
    .append('path')
    .attr('fill', (d, i) => d.data.color)
    .transition()
    .duration(duration)
    .attrTween('d', (d) => {
      const i:(t: number) => number = d3.interpolate(d.startAngle + 0.1, d.endAngle);
      return (t: number) => {
        d.endAngle = i(t);
        return arc(d as any);
      }
    });

  parentGEl
    .append('g')
    .selectAll('polyline')
    .data(dataReady)
    .enter()
    .append('polyline')

};

export default Donutchart;
