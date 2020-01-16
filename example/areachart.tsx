import React, { FC, useRef, useEffect } from 'react';

interface IAreachartProps {}

const Areachart: FC<IAreachartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="card" style={{ width: '33%', height: 400 }}>
        <div className="card-title">Area chart</div>
        <div ref={wrapper} style={{ width: '100%', height: 300 }}></div>
      </div>
    </>
  );
}

export default Areachart;
