import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IHalfDonutchartConfig } from './../lib';

interface IHalfDonutchartProps {}

const HalfDonutchart: FC<IHalfDonutchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IHalfDonutchartConfig = {
      element: wrapper.current,
      data: 77.6
    };
    d3Extend.HalfDonutchart(config);
  }, []);

  return (
    <>
      <div className="card" style={{ width: '33%', backgroundColor: '#757575' }}>
        <div style={{ width: '100%', height: 400 }} ref={wrapper}></div>
      </div>
    </>
  )

};

export default HalfDonutchart;
