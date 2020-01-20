import * as d3 from 'd3';
import Margin, { IChartMargin } from './common/margin';

interface IBarchartData {
  name: string;
  color: string;
  value: number
}

export interface IBarchartConfig {
  element: HTMLElement;
  datas: IBarchartData[];
  yRange: [number, number];
  margin?: IChartMargin;
  guide?: boolean;
}

const Barchart = (config: IBarchartConfig) => {

  const {
    element,
    datas,
    yRange,
    margin = Margin,
    guide = true
  } = config;

  const width: number = element.clientWidth - margin.left - margin.right;
  const height: number = element.clientHeight - margin.top - margin.bottom;

  const svg = d3.select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  
  const parentGEl = svg
    .append('g')
    .attr('transform', `translate(${margin.top}, ${margin.left})`)

  const x = d3.scaleBand()
    .domain(datas.map(data => data.name))
    .rangeRound([0, width])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain(yRange)
    .range([height, 0])

  parentGEl.append('g')
    .attr('transform', `translate(0, ${height})`)
    .attr('stroke-width', 2)
    .call(d3.axisBottom(x))

  parentGEl.append('g')
    .attr('stroke-width', 2)
    .call(d3.axisLeft(y))

  if (guide) {
    const guidelineY = d3.axisLeft(y)
    const guideYGEl = parentGEl.append('g');
    guideYGEl
      .attr('stroke-opacity', 0.5)
      .call(guidelineY.tickSize(-width).tickFormat('' as any))
      .selectAll('line')
      .attr('stroke', '#BDBDBD')
    guideYGEl.selectAll('path').attr('stroke-width', 0);
  }

  const barEls = parentGEl.selectAll('bar')
    .data(datas)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.name))
    .attr('y', height)
    .attr('width', x.bandwidth())
  barEls
    .transition()
    .duration(1000)
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => height - y(d.value))
    .attr('fill', (d) => d.color)
  barEls
    .on('mouseover' , (d) => {
      barEls.attr('opacity', 0.5);
      const targetEl = barEls.filter((f) => f.name === d.name);
      targetEl.attr('opacity', 1);
    })
    .on('mouseleave', (d) => {
      barEls.attr('opacity', 1);
    });


};

export default Barchart;
