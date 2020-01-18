import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IAreachartConfig } from './../lib';

interface IAreachartProps {}

const Areachart: FC<IAreachartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IAreachartConfig = {
      element: wrapper.current,
      dataObjs: [
        {
          name: 'aaa',
          color: '#69b3a2',
          datas: [
            { date: new Date(2020, 0, 13), value: 140 },
            { date: new Date(2020, 0, 14), value: 100 },
            { date: new Date(2020, 0 ,15), value: 150 },
            { date: new Date(2020, 0 ,16), value: 120 },
          ]
        },
        {
          name: 'bbb',
          color: '#90CAF9',
          datas: [
            { date: new Date(2020, 0, 13), value: 10 },
            { date: new Date(2020, 0, 14), value: 20 },
            { date: new Date(2020, 0 ,15), value: 30 },
            { date: new Date(2020, 0 ,16), value: 170 },
          ]
        },
        {
          name: 'ccc',
          color: '#FBC02D',
          datas: [
            { date: new Date(2020, 0, 13), value: 50 },
            { date: new Date(2020, 0, 14), value: 40 },
            { date: new Date(2020, 0 ,15), value: 30 },
            { date: new Date(2020, 0 ,16), value: 20 },
          ]
        },
      ],
      yRange: [0, 200],
      xRange: [new Date(2020, 0, 13), new Date(2020, 0, 16)]
    };
    d3Extend.Areachart(config);
  }, []);

  return (
    <>
      <div className="card" style={{ width: '33%', height: 400 }}>
        <div className="card-title">Area chart</div>
        <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>
      </div>
    </>
  );
}

export default Areachart;
