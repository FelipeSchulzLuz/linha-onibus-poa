import * as React from 'react';
import CustomMap from '../../features/GoogleMap';
import LineBus from "../../features/LineBus"

export default function Home() {
    return (
        <div className="home">
            <LineBus />
            <CustomMap />
        </div>
    );
}