import React, { Component } from 'react';
import CustomMap from '../../features/GoogleMap';
import LineBus from "../../features/LineBus"


export interface IPosition {
    lat: number;
    lng: number;
}

export interface IBus {
    id: string,
    nome: string,
}
export interface Props {
    busList: [],
    lotationList: [],
    busId: string,
}

class Home extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            busLines: [],
            lotationLines: [],
            busId: 0,
        };
    }

    render() {
        return (
            <div className="home" >
                <LineBus />
                <CustomMap />
            </div>
        )
    }
}



export default Home;