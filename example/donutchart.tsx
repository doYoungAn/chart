import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IDonutchartConfig } from './../lib';

interface IDonutchartProps {}

const Donutchart: FC<IDonutchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IDonutchartConfig = {
      element: wrapper.current,
      data: 20,
      fontSize: '1.2rem'
    };
    d3Extend.Donutchart(config);
  }, []);

  return (
    <>
      <div ref={wrapper} style={{ width: '100%', height: '100%' }}></div>
    </>
  );

}

export default Donutchart;
