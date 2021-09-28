import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { memo, useState, useContext, useEffect } from "react";
import { ICoords } from '../../../core/store/Provider';
import store from '../../../core/store/store';

const containerStyle = {
    minWidth: '60%',
    maxWidth: '100%',
    height: '100vh'
};

let center = {
    lat: -30.043392,
    lng: -51.191644
};

function CustomMap() {
    const [mapMarkers, setMapMarkers] = useState([]);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBcQWLh4s4znH97dNwvVkSdHgkztFp-78Y"
    });

    const { coords } = useContext(store);

    const options = {
        strokeColor: '#3f3fb8',
        strokeWeight: 4,
        fillColor: '#3f3fb8',
        clickable: true,
        draggable: false,
        editable: false,
        visible: true,
        radius: 100,
    }

    useEffect(() => {
        let listMarkers: ICoords[] = [];
        for (let coord in coords) {
            if (coords[coord].lat?.length > 0 && coords[coord].lng?.length > 0) {
                listMarkers.push({ ...coords[coord] });
            }
        }
        setMapMarkers(listMarkers);
    }, [coords]);

    return isLoaded ? (
        <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        >
            {mapMarkers?.map((marker: ICoords, index: number) => {
                if (index === 0 || index === mapMarkers.length - 1) {
                    if (index === -1) {
                        return <Marker key={"marker" + index} position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} options={{ visible: true }} />
                    } else {
                        const centerOfLine = (index / 2);
                        const { lat, lng } = mapMarkers[parseInt(centerOfLine.toString())];
                        center = { lat: Number(lat), lng: Number(lng) };

                        return <Marker key={"marker" + index} position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} options={{ visible: true }} />
                    }
                } else {
                    return <Marker key={"marker" + index} position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} options={{ visible: false }} />
                }
            })}
            <Polyline key="polyline" path={mapMarkers.map((x) => ({ lat: Number(x.lat), lng: Number(x.lng) }))} options={options} />
        </GoogleMap>
    ) : <></>
}
export default memo(CustomMap)