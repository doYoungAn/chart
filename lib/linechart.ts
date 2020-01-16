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
  name: string;
  datas: ILinechartData[]
}

interface ILinechartLegend {
  type: 'left' | 'right';
  width: number;
  color: string;
}

export interface ILinechartConfig {
  element: HTMLElement;
  yRange: [number, number];
  xRange: [Date, Date];
  dataObjs: ILinechartDataObj[];
  margin?: IChartMargin;
  lineDot?: boolean;
  guideline?: boolean;
  lineStrokWidth?: number;
  legend?: ILinechartLegend;
}

const Margin: IChartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

const baseOpacity: number           = 0.3;
const strongOpacity: number         = 1;

const yScaleTransform = (legend: ILinechartLegend): string => {
  if (legend === undefined) return ``;
  if (legend.type === 'left') return `translate(${legend.width}, 0)`;
  if (legend.type === 'right') return ``;
}

const xScaleStartPosition = (legend: ILinechartLegend): number => {
  if (legend === undefined) return 0;
  if (legend.type === 'left') return legend.width;
  if (legend.type === 'right') return 0;
}

const xScaleEndPosition = (legend: ILinechartLegend, width: number): number => {
  if (legend === undefined) return width;
  if (legend.type === 'left') return width;
  if (legend.type === 'right') return width - legend.width;
}

const legendTransform = (legend: ILinechartLegend, dataObjsLength: number, width: number, height: number): string => {
  if (legend === undefined) return ``;
  if (legend.type === 'left') return `translate(${0}, ${(height / 2) - (dataObjsLength * 4)})`;
  if (legend.type === 'right') return `translate(${width - legend.width + 20}, ${(height / 2) - (dataObjsLength * 4)})`;
}

const guideYWidth = (legend: ILinechartLegend, width: number): number => {
  if (legend === undefined) return -width;
  if (legend.type === 'left') return -width + legend.width;
  if (legend.type === 'right') return -width + legend.width;
}

const guideYTransform = (legend: ILinechartLegend) => {
  if (legend === undefined) return ``;
  if (legend.type === 'left') return `translate(${legend.width}, 0)`;
  if (legend.type === 'right') return ``;
}

const Linechart = (config: ILinechartConfig) => {

  const {
    element,
    yRange,
    xRange,
    dataObjs,
    margin = Margin,
    lineDot = true,
    guideline = true,
    lineStrokWidth = 3,
    legend
  } = config;

  const width: number = element.clientWidth - margin.right - margin.left;
  const height: number = element.clientHeight - margin.top - margin.bottom;

  const lineStrongStrokWidth: number  = lineStrokWidth * 1.5;
  const circleBaseR: number           = lineStrokWidth * 1.7;
  const circleStrongR: number         = lineStrokWidth * 1.9;
  
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
    .attr('transform', yScaleTransform(legend))
    .attr('stroke-width', 2)
    .call(d3.axisLeft(yScaleLeft));

  const xScale = d3.scaleTime()
    .domain(xRange)
    .range([xScaleStartPosition(legend), xScaleEndPosition(legend, width)])

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
    const guideXGEl = svg.append('g');
    const guideYGEl = svg.append('g');
    guideXGEl
      .attr('stroke-opacity', 0.5)
      .attr('transform', `translate(0, ${height})`)
      .call(guidelineX.tickSize(-height).tickFormat('' as any))
      .selectAll('line')
      .attr('stroke', '#BDBDBD');
    guideXGEl.selectAll('path').attr('stroke-width', 0);
    guideYGEl
      .attr('transform', guideYTransform(legend))
      .attr('stroke-opacity', 0.5)
      .call(guidelineY.tickSize(guideYWidth(legend, width)).tickFormat('' as any))
      .selectAll('line')
      .attr('stroke', '#BDBDBD')
    guideYGEl.selectAll('path').attr('stroke-width', 0);
  }

  if (legend !== undefined) {
    const legendEl = svg
      .append('g')
      .attr('transform', legendTransform(legend, dataObjs.length, width, height))
    const legendDots = legendEl
      .selectAll('legendDots')
      .data(dataObjs.map(obj => ({color: obj.color, name: obj.name})))
      .enter()
      .append('circle')
      .attr('r', 7)
      .attr('cy', (d, i) => i * 20)
      .attr('fill', (d) => d.color)
    // legend
    const legendTexts = legendEl
      .selectAll('legendTexts')
      .data(dataObjs.map(obj => obj.name))
      .enter()
      .append('text')
      .text((d: string) => d)
      .attr('x', 14)
      .attr('y', (d, i) => i * 20)
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle')
      .style('font-size', 12)
      .attr('fill', legend.color)
    legendDots
      .on('mouseover', (d) => {
        const names: string[] = dataObjs.map(obj => obj.name);
        lineEls.forEach((lineEl, index) => {
          const targetIndex: number = names.findIndex((name: string) => name === d.name);
          if (index === targetIndex) {
            lineEl.attr('opacity', strongOpacity);
          } else {
            lineEl.attr('opacity', baseOpacity);
          }
        });
        dotEls.forEach((dotEl, index) => {
          const targetIndex: number = names.findIndex((name: string) => name === d.name);
          if (index === targetIndex) {
            dotEl.attr('opacity', strongOpacity);
          } else {
            dotEl.attr('opacity', baseOpacity);
          }
        });
      })
      .on('mouseleave', (d) => {
        lineEls.forEach((lineEl) => lineEl.attr('opacity', strongOpacity));
        dotEls.forEach((dotEl) => dotEl.attr('opacity', strongOpacity));
      });
    legendTexts
      .on('mouseover', (d: string) => {
        const names: string[] = dataObjs.map(obj => obj.name);
        lineEls.forEach((lineEl, index) => {
          const targetIndex: number = names.findIndex((name: string) => name === d);
          if (index === targetIndex) {
            lineEl.attr('opacity', strongOpacity)
          } else {
            lineEl.attr('opacity', baseOpacity)
          }
        });
        dotEls.forEach((dotEl, index) => {
          const targetIndex: number = names.findIndex((name: string) => name === d);
          if (index === targetIndex) {
            dotEl.attr('opacity', strongOpacity);
          } else {
            dotEl.attr('opacity', baseOpacity);
          }
        });
      })
      .on('mouseleave', (d: string) => {
        lineEls.forEach((lineEl) => lineEl.attr('opacity', strongOpacity));
        dotEls.forEach((dotEl) => dotEl.attr('opacity', strongOpacity));
      })
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
      .attr('stroke-width', lineStrokWidth)
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
        lineEl.attr('stroke-width', lineStrokWidth);
        lineEls.forEach((line) => line.attr('opacity', strongOpacity));
        dotEl ? dotEl.attr('r', circleBaseR) : void 0;
        dotEls.forEach((dot) => dot.attr('opacity', strongOpacity));
      });
    
    lineEls.push(lineEl);
    
    // 라인에 점 그리기
    if (!lineDot) return;
    const dotEl = svg.selectAll('dot')
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
        lineEl.attr('stroke-width', lineStrokWidth);
        lineEls.forEach((line) => line.attr('opacity', strongOpacity));
        dotEl.attr('r', circleBaseR);
        dotEls.forEach((dot) => dot.attr('opacity', strongOpacity));
      });

    dotEls.push(dotEl);
  });
  
  return svg;

};

export default Linechart;
