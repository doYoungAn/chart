import React, { FC, useRef, useEffect } from 'react';
import d3Extend, { ITreemapConfig } from './../../lib';

interface ITreemapProps {}

const Treemap: FC<ITreemapProps> = (): JSX.Element => {

    const wrapper = useRef(null);

    useEffect(() => {
        const config: ITreemapConfig = {
            element: wrapper.current,
            strokeColor: '#EF5350',
            fillColor: '#EF9A9A',
            nameColor: '#7986CB'
        };
        d3Extend.Treemap(config);
    }, []);

    return (
        <>
            <div className="card" style={{ width: '33%', height: 400 }}>
                <div className="card-title">Treemap</div>
                <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>
            </div>
        </>
    );

};

export default Treemap;
