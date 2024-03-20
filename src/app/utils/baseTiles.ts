import { tileLayer, TileLayer } from "leaflet";

export const baseTiles: { [key: string]: TileLayer } = {
    'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        minZoom: 3,
        noWrap: true,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    'CartoDB Light': tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 22,
        minZoom: 3,
        noWrap: true,
    }),
    'CartoDB Dark': tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 22,
        minZoom: 3,
        noWrap: true,
    }),
    'Google Hybrid': tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        minZoom: 3,
        noWrap: true,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    })
}