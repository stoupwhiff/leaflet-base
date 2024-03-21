import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Marker } from "../models/marker.model";
import { OSM } from "../models/osm.model";

@Injectable({
    providedIn: 'root'
})
export class MarkersService {
    private baseUrl: string = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=';
    private backendUrl: string = 'http://localhost:3000/';
    constructor(protected http: HttpClient) { }

    getMarkers() {
        return this.http.get<Marker[]>('assets/markers.json');
    }

    getMarkersFromBackend(data: any) {
        return this.http.post<Marker[]>(`${this.backendUrl}`, data);
    }

    getMarkerByAddress(address: string) {
        return this.http.get<OSM[]>(`${this.baseUrl}${address}`);
    }
}