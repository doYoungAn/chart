import React, { FC, useEffect, useRef } from 'react';
import d3Extends, { ITimelineConfig } from './../lib';

interface ITimelineProps {}

const Timeline: FC<ITimelineProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: ITimelineConfig = {
      element: wrapper.current,
      xRange: [new Date(2020, 0, 11), new Date()],
      dataObjs: [
        {
          name: 'aaa',
          start: new Date(2020, 0, 11),
          end: new Date()
        },
        {
          name: 'bbb',
          start: new Date(2020, 0, 13),
          end: new Date()
        },
        {
          name: 'ccc',
          start: new Date(2020, 0, 13),
          end: new Date()
        },
        {
          name: 'ddd',
          start: new Date(2020, 0, 13),
          end: new Date()
        },
        {
          name: 'eee',
          start: new Date(2020, 0, 13),
          end: new Date(2020, 0, 13, 5)
        },
        {
          name: 'eee',
          start: new Date(2020, 0, 13, 6),
          end: new Date(2020, 0, 13, 8, 30)
        },
        {
          name: 'fff',
          start: new Date(2020, 0, 13, 6),
          end: new Date(2020, 0, 13, 8, 30)
        },
        {
          name: 'gf',
          start: new Date(2020, 0, 13, 6),
          end: new Date(2020, 0, 13, 8, 30)
        },
      ],
      nameWidth: 100,
      nameColor: '#ffffff',
      gridColor: '#BDBDBD',
      barHeight: 30,
      barGap: 6
    };
    d3Extends.Timeline(config);
  }, []);

  return (
    <>
      <div className="card" style={{ width: '49%', height: 400, backgroundColor: '#757575' }}>
        <div ref={wrapper} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </>
  );

};

export default Timeline;
