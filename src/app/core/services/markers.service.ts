import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Marker } from "../models/marker.model";

@Injectable({
    providedIn: 'root'
})
export class MarkersService {
    constructor(protected http: HttpClient) { }

    getMarkers() {
        return this.http.get<Marker[]>('assets/markers.json');
    }
}