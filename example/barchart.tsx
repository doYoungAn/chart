import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { IBarchartConfig } from './../lib';

interface IBarchartProps {}

const Barchart: FC<IBarchartProps> = (): JSX.Element => {

  const wrapper = useRef(null);

  useEffect(() => {
    const config: IBarchartConfig = {
      element: wrapper.current,
      datas: [
        { name: 'a', color: '#388E3C', value: 100 },
        { name: 'b', color: '#BDBDBD', value: 10 },
        { name: 'c', color: '#BDBDBD', value: 78 },
        { name: 'd', color: '#BDBDBD', value: 10 },
        { name: 'e', color: '#BDBDBD', value: 50 },
        { name: 'f', color: '#BDBDBD', value: 12 },
        { name: 'g', color: '#BDBDBD', value: 12 },
      ],
      yRange: [0, 110]
    };
    d3Extend.Barchart(config);
  }, []);

  return (
    <>
      <div className="card" style={{ width: '33%', height: 400 }}>
        <div className="card-title">Barchart</div>
        <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>        
      </div>
    </>
  );

}

export default Barchart;
