import React, { FC, useEffect, useRef } from 'react';

interface ITimelineProps {}

const Timeline: FC<ITimelineProps> = (): JSX.Element => {

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="card" style={{ width: '49%' }}>
        <div style={{ width: '100%', height: 500 }}></div>
      </div>
    </>
  );

};

export default Timeline;
