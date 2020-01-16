import React, { FC, useRef, useEffect } from 'react';

interface IDonutchartProps {}

const Donutchart: FC<IDonutchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  return (
    <>
      <div className="card" style={{ width: '33%', height: 400 }}>
        <div className="card-title">Donut chart</div>
        <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>
      </div>
    </>
  );

}

export default Donutchart;
