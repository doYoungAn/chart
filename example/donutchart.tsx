import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IDonutchartConfig } from './../lib';

interface IDonutchartProps {
  data: number;
  dataColor: string;
}

const Donutchart: FC<IDonutchartProps> = ({ data, dataColor }): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IDonutchartConfig = {
      element: wrapper.current,
      data: data,
      fontSize: '1.2rem',
      dataColor: dataColor
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
