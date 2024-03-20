export class Marker {
    name: string;
    location: [number, number];
    description: string;

    constructor(record: MarkerData) {
        this.name = record.name;
        this.location = record.location;
        this.description = record.description;
    }
}

interface MarkerData {
    name: string;
    location: [number, number];
    description: string;
}
