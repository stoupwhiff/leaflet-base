import { Injectable } from '@angular/core';
import 'leaflet/dist/leaflet.css';
import { MapStatus } from '../../utils/mapStatus';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    currentStatus: MapStatus & { [P in keyof MapStatus]: MapStatus[P] };
    constructor() {
        let defaultStatus: MapStatus = {
            baseLayer: 'Open Street Map',
            center: [40.04152607425133, 9.0713141878476],
            zoom: 7,
            noWrap: true,
            overlay: {}
        };
        let savedStatus = localStorage.getItem('gp-map-status');
        let initialStatus = savedStatus ? JSON.parse(savedStatus) : {};
        let combinedStatus = { ...defaultStatus, ...initialStatus };

        this.currentStatus = new Proxy(combinedStatus as MapStatus & { [P in keyof MapStatus]: MapStatus[P] }, {
            set: <T extends keyof MapStatus>(target: MapStatus, property: T, value: MapStatus[keyof MapStatus]): boolean => {
                target[property] = value as MapStatus[typeof property];
                localStorage.setItem('gp-map-status', JSON.stringify(target));
                return true;
            },
            get: <T extends keyof MapStatus>(target: MapStatus, property: T): MapStatus[T] => {
                return target[property];
            }
        });
    }
}