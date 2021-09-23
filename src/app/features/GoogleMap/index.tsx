import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { memo, useCallback, useState } from "react";

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
    const [mapMarkers, setMapMarkers] = useState(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBcQWLh4s4znH97dNwvVkSdHgkztFp-78Y"
    })

    const onLoad = useCallback(function callback(map) {
        try {
            map.fitBounds(center);
            setMapMarkers(map)
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMapMarkers(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>
            </>
        </GoogleMap>
    ) : <></>
}




export default memo(CustomMap)