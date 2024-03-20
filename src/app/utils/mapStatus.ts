import { Layer } from "leaflet";
import { baseTiles } from "./baseTiles";

export interface MapStatus {
    baseLayer: keyof typeof baseTiles;
    center: { lat: number, lng: number } | [number, number];
    zoom: number;
    overlay: { [name: string]: Layer };
    noWrap: boolean;
}