import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IDonutchartConfig } from '../../lib';

interface IDonutchartProps {}

const Donutchart: FC<IDonutchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IDonutchartConfig = {
      element: wrapper.current,
      datas: [
        { name: 'aaaaa', value: 10, color: '#CE93D8' },
        { name: 'b', value: 20, color: '#9FA8DA' },
        { name: 'c', value: 30, color: '#FFCC80' },
        { name: 'd', value: 40, color: '#C5E1A5' },
        { name: 'eeeee', value: 40, color: '#C5E1A5' },
      ],
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
