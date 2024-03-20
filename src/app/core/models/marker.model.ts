import { LatLngExpression } from "leaflet";

export class Marker {

    name: string | undefined;
    location: [number, number] | undefined;
    description: string | undefined;

    constructor(record?: MarkerData) {
        if (record) {
            this.name = record.name;
            this.location = record.location;
            this.description = record.description;
        }
    }
}

interface MarkerData {
    name: string;
    location: [number, number];
    description: string;
}
