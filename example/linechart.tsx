import React, { FC, useEffect, useRef } from 'react';
import d3Extend, { ILinechartConfig } from './../lib';

interface ILinechartProps {}

const Linechart: FC<ILinechartProps> = () => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: ILinechartConfig = {
      element: wrapper.current,
      yRange: [1, 200],
      xRange: [new Date(2020, 0, 3), new Date(2020, 0, 8)],
      dataObjs: [
        {
          color: '#4FC3F7',
          datas: [
            { date: new Date(2020, 0, 4), value: 100 },
            { date: new Date(2020, 0, 5), value: 60 },
            { date: new Date(2020, 0, 6), value: 10 },
          ]
        },
        {
          color: '#EF9A9A',
          datas: [
            { date: new Date(2020, 0, 3), value: 150 },
            { date: new Date(2020, 0, 4), value: 160 },
            { date: new Date(2020, 0, 5), value: 170 },
            { date: new Date(2020, 0, 6), value: 170 },
            { date: new Date(2020, 0, 7), value: 170 },
            { date: new Date(2020, 0, 8), value: 170 },
          ]
        },
        {
          color: '#B2DFDB',
          datas: [
            { date: new Date(2020, 0, 3), value: 10 },
            { date: new Date(2020, 0, 4), value: 20 },
            { date: new Date(2020, 0, 5), value: 30 },
            { date: new Date(2020, 0, 6), value: 40 },
            { date: new Date(2020, 0, 7), value: 50 },
            { date: new Date(2020, 0, 8), value: 60 },
          ]
        },
      ],
      lineDot: true,
      guideline: true
    };
    d3Extend.Linechart(config);
  }, []);

  return (
    <>
      <div style={{ width: 1000, height: 700 }} ref={wrapper}></div>
    </>
  );

}

export default Linechart;
