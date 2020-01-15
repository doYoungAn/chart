import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IPiechartConfig } from './../lib';

interface IPieChartProps {}

const Piechart: FC<IPieChartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IPiechartConfig = {
      element: wrapper.current,
      data: {a: 9, b: 20, c: 30, d: 8, e: 12, f: 10},
      textColor: '#000000',
      strokeColor: '#ffffff'
    };
    d3Extend.Piechart(config);
  }, []);

  return (
    <>
      <div className="card" style={{ width: '49%' }}>
        <div style={{ width: '100%', height: 400 }} ref={wrapper}></div>
      </div>
    </>  
  );

}

export default Piechart;
