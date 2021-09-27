import axios from 'axios';

const BASE_URL = "http://www.poatransporte.com.br/php/facades/process.php?"

export default async function loadLinesList(isBus) {
    const resp = await axios.get(`${BASE_URL}a=nc&p=%&t=${isBus ? "o" : "l"}`);
    return resp.data;
}

export async function loadLongLat(id) {
    const listOfCoords = []
    const resp = await axios.get(`${BASE_URL}a=il&p=${id}`);
    for (const [, value] of Object.entries(resp.data)) {
        const line = value;
        listOfCoords.push({
            lat: line.lat,
            lng: line.lng
        });
    }
    return listOfCoords;
}
