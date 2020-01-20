import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IHalfPiechartConfig } from '../../lib';

interface IHalfDonutchartProps {
  data: number;
  dataColor: string;
  tickSize: number;
}

const HalfDonutchart: FC<IHalfDonutchartProps> = ({ data, dataColor, tickSize }): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IHalfPiechartConfig = {
      element: wrapper.current,
      data: data,
      tickSize: tickSize,
      dataColor: dataColor,
      fontSize: '1.2rem'
    };
    d3Extend.HalfPiechart(config);
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }} ref={wrapper}></div>
    </>
  )

};

export default HalfDonutchart;
