import React, { FC, useRef, useEffect } from 'react';

interface IHalfDonutchartProps {}

const HalfDonutchart: FC<IHalfDonutchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="card" style={{ width: '49%' }}>
        <div style={{ width: '100%', height: 400 }} ref={wrapper}></div>
      </div>
    </>
  )

};

export default HalfDonutchart;
