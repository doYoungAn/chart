import * as d3 from 'd3';

interface IPiechartData {
  [key: string]: number;
}

export interface IPiechartConfig {
  element: HTMLElement;
  data: IPiechartData
  margin?: number;
  strokeColor?: string;
  strokeWidth?: number;
  textColor?: string;
  textSize?: number | string;
  baseOpacity?: number;
  strongOpacity?: number;
  animationDuration?: number;
  scaleSize?: number;
}

const Piechart = (config: IPiechartConfig) => {

  const {
    element,
    data,
    margin = 40,
    strokeColor = '#000000',
    strokeWidth = 2,
    textColor = '#000000',
    textSize = 20,
    baseOpacity = 0.6,
    strongOpacity = 1,
    animationDuration = 300,
    scaleSize = 1.05
  } = config;

  const width: number = element.clientWidth;
  const height: number = element.clientHeight;  
  const radius: number = Math.min(width, height) / 2 - margin;

  const svg = d3.select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const parentGEl = svg  
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const color = d3.scaleOrdinal()
    .domain(data as any)
    .range(d3.schemeSet3)

  const pie: d3.Pie<any, any> = d3
    .pie()
    .value((d: any) => d.value)

  const dataReady: d3.PieArcDatum<{key: string, value: number}>[] = pie(d3.entries(data));
  const arcGenerator: d3.Arc<any, d3.DefaultArcObject> = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);

  // 파이 부분들
  const partEls = parentGEl
    .selectAll('whatever')
    .data(dataReady)
    .enter()
    .append('path')
    
    .attr('d', arcGenerator as any)
    .attr('fill', (d: d3.PieArcDatum<{key: string, value: number}>) => {
      return color(d.data.key) as string;
    })
    .attr('stroke', strokeColor)
    .style('stroke-width', strokeWidth)
    
    .style('opacity', baseOpacity);
  // 파이 이벤트
  partEls
    .on('mouseover', (d) => {
      const targetEl = partEls.filter((obj) => obj.data.key === d.data.key);
      partEls.style('opacity', baseOpacity);
      targetEl
        .transition()
        .duration(animationDuration)
        .attr('transform', `scale(${scaleSize})`)
        .style('opacity', strongOpacity);
    })
    .on('mouseleave', (d) => {
      partEls
        .transition()
        .duration(animationDuration)
        .attr('transform', `scale(${1})`)
        .style('opacity', baseOpacity);
    });

  // 파이에 나오는 텍스트
  const textEls = parentGEl
    .selectAll('whatever')
    .data(dataReady)
    .enter()
    .append('text')
    .text((d: d3.PieArcDatum<{key: string, value: number}>) => {
      return d.data.key;
    })
    .attr('transform', (d: d3.PieArcDatum<{key: string, value: number}>) => {
      return `translate(${arcGenerator.centroid(d as any)})`
    })
    .attr('fill', textColor)
    .style('text-anchor', 'middle')
    .style('font-size', textSize)
  // 텍스트 이벤트
  textEls
    .on('mouseover', (d) => {
      const targetEl = partEls.filter((obj) => obj.data.key === d.data.key);
      partEls.style('opacity', baseOpacity);
      targetEl
        .transition()
        .duration(animationDuration)
        .attr('transform', `scale(${scaleSize})`)
        .style('opacity', strongOpacity);
    })
    .on('mouseleave', (d) => {
      partEls
        .transition()
        .duration(animationDuration)
        .attr('transform', `scale(${1})`)
        .style('opacity', baseOpacity);
    });


};

export default Piechart;
