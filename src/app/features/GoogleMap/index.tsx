import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { memo, useCallback, useState, useContext, useEffect } from "react";
import { ICoords } from '../../../core/store/Provider';
import store from '../../../core/store/store';

const containerStyle = {
    minWidth: '60%',
    maxWidth: '100%',
    height: '100vh'
};

const center = {
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
        clickable: false,
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

    const onLoad = useCallback(function callback(map) {
        try {
            if (map.length > 0) {
                map.fitBounds(center);
                setMapMarkers(map)

            }
        }
        catch (e: any) {
            console.log(e.message);
        }
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMapMarkers([])
    }, [])

    return isLoaded ? (
        <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {mapMarkers?.map((marker: ICoords, index: number) => {
                if (index === 0 || index === mapMarkers.length - 1) {
                    return <Marker key={"marker" + index} position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} options={{ visible: true }} />
                } else {
                    return <Marker key={"marker" + index} position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} options={{ visible: false }} />
                }
            })}
            <Polyline key="polyline" path={mapMarkers.map((x) => ({ lat: Number(x.lat), lng: Number(x.lng) }))} options={options} />
        </GoogleMap>
    ) : <></>
}




export default memo(CustomMap)