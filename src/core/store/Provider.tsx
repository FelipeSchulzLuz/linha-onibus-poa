import React, { Component } from 'react';
import BusContext from './store';

export interface ICoords {
    lat: string;
    lng: string;
}

type State = {
    coords: ICoords[];
}

class Provider extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            coords: []
        };
    }

    handleChangeCoords = (coordinates: ICoords[]) => {
        this.setState({ coords: coordinates });
    }

    render() {
        const coords = this.state.coords;
        const changeCoords = this.handleChangeCoords;
        return (
            <BusContext.Provider value={{ coords, changeCoords }} >
                {this.props.children}
            </BusContext.Provider>
        );
    }
}

export default Provider;