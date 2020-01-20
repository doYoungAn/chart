import * as d3 from 'd3';

interface IDonutchartData {
  name: string;
  value: number;
  color: string;
}

export interface IDonutchartConfig {
  element: HTMLElement;
  datas: IDonutchartData[];
  tickSize?: number;
  margin?: number;
  polylineColor?: string;
  nameColor?: string;
}

const Donutchart = (config: IDonutchartConfig) => {

  const {
    element,
    datas,
    tickSize = 0.2,
    margin = 40,
    polylineColor = '#BDBDBD',
    nameColor = '#000000'
  } = config;

  const width: number = element.clientWidth;
  const height: number = element.clientHeight;
  const radius: number = Math.min(width, height) / 2 - margin;

  const pies: d3.Pie<any, any> = d3
    .pie()
    .value((d: any) => d.value)

  const dataReady: d3.PieArcDatum<IDonutchartData>[] = pies(datas);

  const arc: d3.Arc<any, d3.DefaultArcObject> = d3.arc()
    .innerRadius(radius * (0.8 - tickSize))
    .outerRadius(radius * 0.8)

  const outerArc: d3.Arc<any, d3.DefaultArcObject> = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

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
    .attr('d', (d) => arc(d as any))
    // .transition()
    // .duration(duration)
    // .attrTween('d', (d) => {
    //   const i:(t: number) => number = d3.interpolate(d.startAngle + 0.1, d.endAngle);
    //   return (t: number) => {
    //     d.endAngle = i(t);
    //     return arc(d as any);
    //   }
    // });

  parentGEl
    .append('g')
    .selectAll('polyline')
    .data(dataReady)
    .enter()
    .append('polyline')
    .attr('stroke', polylineColor)
    .style('fill', 'none')
    .attr('stroke-width', 2)
    .attr('points', (d: any) => {
      const posA = arc.centroid(d)
      const posB = outerArc.centroid(d)
      const posC = outerArc.centroid(d);
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
      return [posA, posB, posC] as any;
    });

  parentGEl
    .append('g')
    .selectAll('allLabels')
    .data(dataReady)
    .enter()
    .append('text')
    .attr('fill', nameColor)
    .text((d) => d.data.name)
    .attr('transform', (d: any) => {
      const pos: [number, number] = outerArc.centroid(d);
      const midangle: number = d.startAngle + (d.endAngle - d.startAngle) / 2;
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return `translate(${pos})`;
    })
    .style('text-anchor', (d: any) => {
      const midangle: number = d.startAngle + (d.endAngle - d.startAngle) / 2;
      return (midangle < Math.PI ? 'start' : 'end');
    })

};

export default Donutchart;
