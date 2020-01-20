import * as d3 from 'd3';
import Margin, { IChartMargin } from './common/margin';

interface IMultiBarchartData {
  category: string;
  values: { rate: string, value: number }[];
}

export interface IMultiBarchartConfig {
  element: HTMLElement;
  datas: IMultiBarchartData[];
  yRange: [number, number];
  margin?: IChartMargin;
  guide?: boolean;
}

const MultiBarchart = (config: IMultiBarchartConfig) => {

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
    .attr('height', height + margin.top + margin.bottom);

  const parentGEl = svg
    .append('g')
    .attr('transform', `translate(${margin.top}, ${margin.left})`)

  const parentX = d3.scaleBand()
    .domain(datas.map(obj => obj.category))
    .rangeRound([0, width])
    .paddingInner(0.1)

  const childX = d3.scaleBand()
    .padding(0.05)
    .domain(datas[0].values.map(obj => obj.rate))
    .rangeRound([0, parentX.bandwidth()]);

  const y = d3.scaleLinear()
    .domain(yRange)
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  parentGEl.append('g')
    .attr('transform', `translate(0, ${height})`)
    .attr('stroke-width', 2)
    .call(d3.axisBottom(parentX))

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

  const barGroupEl = parentGEl
    .append('g')
    .selectAll('g')
    .data(datas)
    .enter()
    .append('g')
    .attr('transform', (d) => `translate(${parentX(d.category)}, 0)`)

  const childBarEls = barGroupEl
    .selectAll('rect')
    .data((d) => d.values)
    .enter()
    .append('rect')
    .attr('x', (d) => childX(d.rate))
    .attr('y', (d) => height)
    .attr('width', childX.bandwidth())
  childBarEls
    .transition()
    .duration(1000)
    .attr('height', (d) => height - y(d.value))
    .attr('y', (d) => y(d.value))
    .attr('fill', (d) => color(d.rate) as any)

};

export default MultiBarchart;
