import React, { FC, useRef, useEffect } from 'react';

interface IHeatmapProps {}

const Heatmap: FC<IHeatmapProps> = (): JSX.Element => {

    const wrapper = useRef(null);

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="card" style={{ width: '33%', height: 400 }}>
                <div className="card-title">Heatmap</div>
                <div ref={wrapper} style={{ width: '100%', height: 350 }}></div>
            </div>
        </>
    );
};

export default Heatmap;