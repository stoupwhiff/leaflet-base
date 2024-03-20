import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Marker } from "../models/marker.model";

@Injectable({
    providedIn: 'root'
})
export class MarkersService {
    private baseUrl: string = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=';
    constructor(protected http: HttpClient) { }

    getMarkers() {
        return this.http.get<Marker[]>('assets/markers.json');
    }

    getMarkerByAddress(address: string) {
        return this.http.get<any>(`${this.baseUrl}${address}`);
    }
}