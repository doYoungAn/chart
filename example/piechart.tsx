import React, { FC, useRef } from 'react';

interface IPieChartProps {}

const Piechart: FC<IPieChartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  return (
    <>
      <div className="card" style={{ width: '49%' }}>
        <div style={{ width: '100%', height: 600 }} ref={wrapper}></div>
      </div>
    </>  
  );

}

export default Piechart;
