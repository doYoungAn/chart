import React, { FC, useRef, useEffect } from 'react';

interface IMultiBarchartProps {}

const MultiBarchart: FC<IMultiBarchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {

  }, [])

  return (
    <>
      <div className="card" style={{ width: '33%', height: 400 }}>
        <div ref={wrapper} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </>
  )
};

export default MultiBarchart;
