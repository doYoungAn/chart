import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IHalfDonutchartConfig } from './../lib';

interface IHalfDonutchartProps {
  data: number;
  dataColor: string;
  tickSize: number;
}

const HalfDonutchart: FC<IHalfDonutchartProps> = ({ data, dataColor, tickSize }): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IHalfDonutchartConfig = {
      element: wrapper.current,
      data: data,
      tickSize: tickSize,
      dataColor: dataColor,
      fontSize: '1.2rem'
    };
    d3Extend.HalfDonutchart(config);
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }} ref={wrapper}></div>
    </>
  )

};

export default HalfDonutchart;
